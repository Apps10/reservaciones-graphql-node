import * as z from 'zod'
import { config } from 'dotenv'

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  JWT_SECRET: z.string()
})

type IEnv = z.infer<typeof envSchema>

class Env {
  private static envs: IEnv

  private constructor(){}

  public static getInstance(): IEnv {
    config()
    if(!Env.envs){
      const result = envSchema.safeParse(process.env)
      if(!result.success){
        console.error(`
          ❌ Invalid environment variables: ${JSON.stringify(result.error.format(), null, 2)}
        `)
        throw new Error('Invalid Environment variables')
      }
      Env.envs = result.data
    }
    return Env.envs
  }
}

export const {
  PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  DB_USER,
  JWT_SECRET
}: IEnv = Env.getInstance()
