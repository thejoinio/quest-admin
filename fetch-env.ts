import { execSync } from "child_process";
import { writeFileSync } from "fs";
import dotenv from 'dotenv'
dotenv.config();

function main() {
    const dopplerToken = process.env.DOPPLER_TOKEN;

    if (!dopplerToken) {
        console.error("❌ Missing DOPPLER_TOKEN environment variable");
        process.exit(1);
    }

    try {
        // Fetch secrets in .env format
        const output = execSync(
            `doppler secrets download --no-file --format env --token=${dopplerToken}`,
            { encoding: "utf-8" }
        );

        // Write them into .env file
        writeFileSync(".env", output);
        console.log("✅ Environment variables written to .env");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("❌ Failed to fetch Doppler secrets:", err.message);
        process.exit(1);
    }
}

main();