'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ChatPanel } from './chat-panel'
import { ChatMessages } from './chat-messages'
import { useUIState } from 'ai/rsc'

type ChatProps = {
  id?: string
  query?: string
}

export function Chat({ id, query }: ChatProps) {
  const { theme } = useTheme()
  console.log(theme)
  const path = usePathname()
  const [messages] = useUIState()

  useEffect(() => {
    if (!path.includes('search') && messages.length === 1) {
      window.history.replaceState({}, '', `/search/${id}`)
    }
  }, [id, path, messages, query])

  return (
    <div className="px-8 sm:px-12 pt-12 md:pt-14 pb-14 md:pb-24 max-w-3xl mx-auto flex flex-col space-y-3 md:space-y-4">
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <img src={`/${theme === 'light' ? 'Logo-black.png' : 'Logo-white.png'}`} className="w-40" />
        <span className="text-3xl">Proof of Me</span>
      </div>
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} query={query} />
    </div>
  )
}
