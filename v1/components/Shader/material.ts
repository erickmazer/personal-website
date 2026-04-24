import { shaderMaterial } from '@react-three/drei'
import type { ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * GridNoiseMaterial — ambient background shader.
 *
 * Aesthetic: "dust catching low light" — slow, quiet, muted earthen palette.
 * NOT an impressive demo. If you notice it demanding attention, it's wrong.
 *
 * Uniforms:
 *   uTime       — seconds since mount (slowly advanced: uTime * 0.06)
 *   uMouse      — normalized cursor (0..1), smoothed via lerp
 *   uResolution — pixel dimensions
 *   uColorInk   — near-black base (oklch ~0.15 0.01 80)
 *   uColorPatina — muted warm tan accent (oklch ~0.55 0.04 60)
 *   uGridSize   — cells along the shortest axis (larger = smaller dots)
 *   uNoiseScale — FBM spatial frequency
 *   uIntensity  — overall blend intensity (keep LOW)
 *   uDistort    — strength of mouse distortion (0 = none, ~0.02 peak)
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  uniform vec3  uColorInk;
  uniform vec3  uColorPatina;
  uniform float uGridSize;
  uniform float uNoiseScale;
  uniform float uIntensity;
  uniform float uDistort;

  varying vec2 vUv;

  // Simple 2D hash
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Value noise
  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // FBM (3 octaves — staying below the ≤4 guardrail)
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 3; i++) {
      v += amp * valueNoise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    // Preserve aspect
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv;

    // Mouse-reactive UV distortion (radial falloff toward cursor)
    vec2 toMouse = (uv - uMouse) * aspect;
    float dist = length(toMouse);
    float falloff = exp(-dist * 6.0);     // tight falloff around cursor
    uv -= toMouse * falloff * uDistort;   // pull UVs gently toward cursor

    // Dotted grid
    vec2 grid = uv * aspect * uGridSize;
    vec2 cell = fract(grid) - 0.5;
    float dotDist = length(cell);
    // Soft dot — smoothstep between (radius - blur) and radius
    float radius = 0.08;
    float blur = 0.08;
    float dotMask = 1.0 - smoothstep(radius - blur, radius, dotDist);

    // Slow FBM noise
    vec2 noiseUV = uv * uNoiseScale + vec2(uTime * 0.012, uTime * 0.007);
    float n = fbm(noiseUV);
    // Concentrate noise range
    n = smoothstep(0.3, 0.8, n);

    // Base color: blend ink → patina via noise
    vec3 base = mix(uColorInk, uColorPatina, n * uIntensity);

    // Dots are slightly brighter than base (using the noise as an attenuator)
    vec3 dotColor = mix(base, uColorPatina, 0.35);
    vec3 color = mix(base, dotColor, dotMask * (0.35 + 0.65 * n) * uIntensity);

    // Vignette — quiet edges
    vec2 vigUv = vUv - 0.5;
    float vig = 1.0 - smoothstep(0.3, 0.9, length(vigUv));
    color *= mix(0.85, 1.0, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`

export const GridNoiseMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
    uColorInk: new THREE.Color('#1a1712'),     // warm near-black
    uColorPatina: new THREE.Color('#8a6f4e'),   // muted warm tan
    uGridSize: 48,
    uNoiseScale: 1.6,
    uIntensity: 0.35,
    uDistort: 0.018,
  },
  vertexShader,
  fragmentShader,
)

declare module '@react-three/fiber' {
  interface ThreeElements {
    gridNoiseMaterial: ReactThreeFiber.ThreeElement<typeof GridNoiseMaterial>
  }
}
