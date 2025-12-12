"use client"

import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  ImageIcon,
  File,
  Mic,
  Plus,
  Users,
  Pin,
  Star,
  Archive,
  Circle,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  sender: string
  senderAvatar: string
  content: string
  time: string
  isMe: boolean
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "file" | "voice"
  fileName?: string
  fileSize?: string
}

interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  isGroup: boolean
  members?: number
  isPinned?: boolean
  isStarred?: boolean
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Marketing jamoasi",
    avatar: "MJ",
    lastMessage: "Loyiha tayyor bo'ldimi?",
    time: "10:30",
    unread: 3,
    online: true,
    isGroup: true,
    members: 8,
    isPinned: true,
  },
  {
    id: 2,
    name: "Dilshod Rahimov",
    avatar: "DR",
    lastMessage: "Yaxshi, kelishdik!",
    time: "09:45",
    unread: 0,
    online: true,
    isGroup: false,
    isStarred: true,
  },
  {
    id: 3,
    name: "Laylo Karimova",
    avatar: "LK",
    lastMessage: "Hujjatlarni yubordim",
    time: "Kecha",
    unread: 1,
    online: false,
    isGroup: false,
  },
  {
    id: 4,
    name: "IT bo'limi",
    avatar: "IT",
    lastMessage: "Server yangilandi",
    time: "Kecha",
    unread: 0,
    online: true,
    isGroup: true,
    members: 5,
  },
  {
    id: 5,
    name: "Sardor Aliyev",
    avatar: "SA",
    lastMessage: "Rahmat!",
    time: "12.08",
    unread: 0,
    online: false,
    isGroup: false,
  },
  {
    id: 6,
    name: "HR bo'limi",
    avatar: "HR",
    lastMessage: "Yangi xodim haqida",
    time: "11.08",
    unread: 5,
    online: true,
    isGroup: true,
    members: 4,
  },
  {
    id: 7,
    name: "Mohira Tosheva",
    avatar: "MT",
    lastMessage: "Qachon uchrashish mumkin?",
    time: "10.08",
    unread: 0,
    online: false,
    isGroup: false,
  },
]

const messages: Message[] = [
  {
    id: 1,
    sender: "Dilshod Rahimov",
    senderAvatar: "DR",
    content: "Assalomu alaykum! Loyiha bo'yicha yangiliklar bormi?",
    time: "09:00",
    isMe: false,
    status: "read",
    type: "text",
  },
  {
    id: 2,
    sender: "Men",
    senderAvatar: "AK",
    content: "Vaalaykum assalom! Ha, deyarli tayyor. Bugun kechqurun yuboraman.",
    time: "09:05",
    isMe: true,
    status: "read",
    type: "text",
  },
  {
    id: 3,
    sender: "Dilshod Rahimov",
    senderAvatar: "DR",
    content: "Ajoyib! Mijoz juda kutayapti.",
    time: "09:10",
    isMe: false,
    status: "read",
    type: "text",
  },
  {
    id: 4,
    sender: "Men",
    senderAvatar: "AK",
    content: "Tushundim. Dizayn fayllarini ham qo'shib yuboraymi?",
    time: "09:15",
    isMe: true,
    status: "read",
    type: "text",
  },
  {
    id: 5,
    sender: "Dilshod Rahimov",
    senderAvatar: "DR",
    content: "Ha, albatta. Prezentatsiya ham kerak bo'ladi.",
    time: "09:20",
    isMe: false,
    status: "read",
    type: "text",
  },
  {
    id: 6,
    sender: "Men",
    senderAvatar: "AK",
    content: "",
    time: "09:30",
    isMe: true,
    status: "read",
    type: "file",
    fileName: "Loyiha_prezentatsiya.pdf",
    fileSize: "2.4 MB",
  },
  {
    id: 7,
    sender: "Dilshod Rahimov",
    senderAvatar: "DR",
    content: "Qabul qildim. Ko'rib chiqaman.",
    time: "09:35",
    isMe: false,
    status: "read",
    type: "text",
  },
  {
    id: 8,
    sender: "Men",
    senderAvatar: "AK",
    content: "Yaxshi, savollar bo'lsa yozing.",
    time: "09:40",
    isMe: true,
    status: "delivered",
    type: "text",
  },
  {
    id: 9,
    sender: "Dilshod Rahimov",
    senderAvatar: "DR",
    content: "Yaxshi, kelishdik!",
    time: "09:45",
    isMe: false,
    status: "read",
    type: "text",
  },
]

export function MessagesSection() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[1])
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [chatFilter, setChatFilter] = useState<"all" | "unread" | "groups">("all")

  const filteredChats = chats
    .filter((chat) => {
      if (chatFilter === "unread") return chat.unread > 0
      if (chatFilter === "groups") return chat.isGroup
      return true
    })
    .filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Xabarlar</h1>
          <p className="mt-1 text-muted-foreground">Jamoa bilan aloqada bo'ling</p>
        </div>
        <Button
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
        >
          <Plus className="h-4 w-4" />
          Yangi chat
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jami chatlar", value: "24", icon: MessageSquare, color: "from-blue-500 to-blue-600" },
          { label: "O'qilmagan", value: "9", icon: Circle, color: "from-red-500 to-red-600" },
          { label: "Guruhlar", value: "6", icon: Users, color: "from-green-500 to-green-600" },
          { label: "Arxiv", value: "12", icon: Archive, color: "from-gray-500 to-gray-600" },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  stat.color,
                )}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
          <div className="p-4 border-b border-border/50 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Chatlarni qidirish..."
                className="pl-9 bg-muted/50 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                { label: "Barchasi", value: "all" },
                { label: "O'qilmagan", value: "unread" },
                { label: "Guruhlar", value: "groups" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setChatFilter(filter.value as typeof chatFilter)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    chatFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-120px)]">
            {sortedChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-all border-b border-border/30",
                  selectedChat?.id === chat.id && "bg-primary/10 border-l-2 border-l-primary",
                )}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl text-white font-semibold",
                      chat.isGroup
                        ? "bg-gradient-to-br from-violet-500 to-purple-600"
                        : "bg-gradient-to-br from-primary to-primary/70",
                    )}
                  >
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
                  )}
                  {chat.isPinned && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center">
                      <Pin className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground truncate">{chat.name}</span>
                      {chat.isStarred && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1.5">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  {chat.isGroup && <p className="text-xs text-muted-foreground mt-0.5">{chat.members} ta a'zo</p>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl text-white font-semibold",
                        selectedChat.isGroup
                          ? "bg-gradient-to-br from-violet-500 to-purple-600"
                          : "bg-gradient-to-br from-primary to-primary/70",
                      )}
                    >
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedChat.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.isGroup
                        ? `${selectedChat.members} ta a'zo`
                        : selectedChat.online
                          ? "Online"
                          : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex gap-3", message.isMe && "flex-row-reverse")}>
                    {!message.isMe && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-white text-xs font-semibold">
                        {message.senderAvatar}
                      </div>
                    )}
                    <div className={cn("max-w-[70%]", message.isMe && "items-end")}>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5",
                          message.isMe
                            ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-br-md"
                            : "bg-muted/80 text-foreground rounded-bl-md",
                        )}
                      >
                        {message.type === "text" && <p className="text-sm">{message.content}</p>}
                        {message.type === "file" && (
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-lg",
                                message.isMe ? "bg-white/20" : "bg-primary/10",
                              )}
                            >
                              <File className={cn("h-5 w-5", message.isMe ? "text-white" : "text-primary")} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{message.fileName}</p>
                              <p className={cn("text-xs", message.isMe ? "text-white/70" : "text-muted-foreground")}>
                                {message.fileSize}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={cn("flex items-center gap-1 mt-1 px-1", message.isMe && "justify-end")}>
                        <span className="text-[10px] text-muted-foreground">{message.time}</span>
                        {message.isMe &&
                          (message.status === "read" ? (
                            <CheckCheck className="h-3 w-3 text-primary" />
                          ) : (
                            <Check className="h-3 w-3 text-muted-foreground" />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Xabar yozing..."
                      className="pr-10 bg-muted/50 border-0 rounded-xl"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-lg"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="rounded-xl bg-gradient-to-r from-primary to-primary/80 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50 mx-auto">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Chatni tanlang</h3>
                  <p className="text-sm text-muted-foreground">Suhbatni boshlash uchun chapdan chat tanlang</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
