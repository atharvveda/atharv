import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-static'

export { metadata } from 'next-sanity/studio'
export { viewport } from 'next-sanity/studio'

export default function StudioPage() {
    return <NextStudio config={config} />
}
