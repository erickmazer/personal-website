export default function CssFallback() {
  return (
    <div
      aria-hidden="true"
      data-shader-tier="css"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        background: `
          radial-gradient(
            ellipse at 30% 20%,
            oklch(0.22 0.02 70) 0%,
            oklch(0.15 0.01 80) 60%,
            oklch(0.12 0.01 85) 100%
          )
        `,
        pointerEvents: 'none',
      }}
    />
  )
}
