import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export interface Config {
  port: number
  debugLogging: boolean
  dbsslconn: boolean
  jwtSecret: string
  databaseUrl: string
  dbEntitiesPath: string[]
  cronJobExpression: string
  tokenExpiresTime: number
}

const isDevMode = process.env.NODE_ENV === 'development'

const config: Config = {
  port: +(process.env.PORT || 3300),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || '123456',
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
  dbEntitiesPath: [
    ...(isDevMode
      ? ['src/modules/**/entity/**/*.ts']
      : ['dist/modules/**/entity/**/*.js'])
  ],
  cronJobExpression: '0 * * * *',
  tokenExpiresTime: 24 * 60 * 60 * 1000 // 24h
}

export { config }
