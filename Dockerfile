# Step 1: Install dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Step 2: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

# ✅ Install pnpm again in builder stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Step 3: Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# ✅ Install pnpm again in runner stage
RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# ✅ Use "pnpm start" if you defined it in package.json
CMD ["pnpm", "start"]
