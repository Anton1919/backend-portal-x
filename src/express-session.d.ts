import 'express-session'

// здесь мы расширяем интерфейс SessionData из модуля 'express-session'
// userId - это id который мы будем получать из сессии и по нему мы будем выполнять поиск пользователя

// так как interface SessionData уже существует в express-session, мы добавляем declare
// declare module используется потому что:
// Мы не создаем новый модуль, а расширяем существующий express-session,
// Без declare TypeScript подумал бы, что мы пытаемся создать новый модуль
declare module 'express-session' {
  interface SessionData {
    userId?: string
  }
}
