import { registerAs } from "@nestjs/config";
import { sqlConfig } from "./sql.config";
// это для основной кофигурации nestjs
export const databaseConfig = registerAs('database', () => ({
    sql: {
        ...sqlConfig()
    }
}))