import { Hero } from '@/components/sections/Hero'
import { Bio } from '@/components/sections/Bio'
import { Fatherhood } from '@/components/sections/Fatherhood'
import { History } from '@/components/sections/History'
import { Thinking } from '@/components/sections/Thinking'
import { Media } from '@/components/sections/Media'
import { Social } from '@/components/sections/Social'

export default async function Home() {
  return (
    <>
      <Hero />
      <Bio />
      <Fatherhood />
      <History />
      <Thinking />
      <Media />
      <Social />
    </>
  )
}
