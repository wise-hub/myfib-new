## PM2

pm2 start node --name "myfibank" -- ./node_modules/next/dist/bin/next start -p 3000

pm2 list

pm2 delete all

pm2 flush

pm2 save
