const undici = require('undici');
const PQueue = require('p-queue').default;

const queue = new PQueue({ concurrency: 20 });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    while (true) {
        if (queue.pending >= 20) {
            await sleep(1000);
            continue;
        }

        queue.add(async () => {
            console.log('start');
            try {
                const { body, statusCode } = await undici.fetch('https://api.foxe.vip/api/merkle/');
                if (statusCode !== 200) {
                    console.log('fail', statusCode);
                } else {
                    const json = await body.json();
                    console.log(json);
                    process.exit(0);
                }
            } catch (e) {
                console.log('fail', e.toString());
            }
        });
    }
}

main().catch(console.error);
