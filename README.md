[![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE.md)

# 🏨 Hotel Review App

シンプルかつ実用的なホテルレビュー・プラットフォーム。Next.js 14（App Router）、Supabase、Tailwind CSS を採用。

---

## 📋 Table of Contents

1. [Demo](#-demo)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Prerequisites](#-prerequisites)  
5. [Getting Started](#-getting-started)  
   - [Clone Repository](#clone-repository)  
   - [Install Dependencies](#install-dependencies)  
   - [Configure Environment](#configure-environment)  
   - [Run Locally](#run-locally)  
6. [Database Schema](#-database-schema)  
7. [Environment Variables](#-environment-variables)  
8. [Contributing](#-contributing)  
9. [License](#-license)  
10. [Author](#-author)  

---

## 🚀 Demo

<!-- スクリーンショットやデプロイ先リンクをここに貼る -->
![Screenshot](./assets/screenshot.png)

---

## ✨ Features

- 🔎 **ライブ検索**：ホテ﻿ル名サジェスト付き  
- ✏️ **レビュー投稿・編集**  
- ⭐ **評価システム**（星評価）  
- 🔐 **認証**：Supabase Auth  
- 📝 **下書き機能**  
- 🔓 **公開 / 非公開切替**  
- 🐾 **アバター選択**：動物アイコン  
- 📊 **平均評価**：公開レビューのみを集計  

---

## 🚧 Tech Stack

| レイヤー   | 技術                                                         |
| ---------- | ------------------------------------------------------------ |
| フロントエンド | Next.js 14 (App Router), React                              |
| スタイリング  | Tailwind CSS                                                  |
| バックエンド  | Supabase (PostgreSQL, Auth, Storage)                        |
| アニメーション | Framer Motion                                               |
| アイコン    | Lucide Icons                                                 |

---

## 🔧 Prerequisites

- Node.js ≥ 18.x  
- npm or yarn  
- Supabase プロジェクト  

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/hotel-review-app.git
cd hotel-review-app
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Configure Environment

```env
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Run Locally

```bash
npm run dev
# or
yarn dev
```
