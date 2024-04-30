import { AppConfig } from "common/Config.abstract";

class Config extends AppConfig {
    load() {
        return {
            PORT: process.env.PORT,
        };
    }

    test() {
        console.log("PORT IS: " + this.get("PORT"));
    }
}

export const config = new Config();
