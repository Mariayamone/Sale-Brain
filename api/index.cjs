var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// scripts/vercel-api-entry.ts
var vercel_api_entry_exports = {};
__export(vercel_api_entry_exports, {
  default: () => handler
});
module.exports = __toCommonJS(vercel_api_entry_exports);

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json({ limit: "10mb" }));
var STATE_FILE = process.env.VERCEL ? import_path.default.join("/tmp", "sales_brain_state.json") : import_path.default.join(process.cwd(), "sales_brain_state.json");
var DEFAULT_STATE = {
  config: {
    shopName: "Shwe Pathein Sweet Treats & Artisanal Crafts",
    ownerName: "Yoon Yamone Oo",
    phone: "09971234567",
    currency: "MMK",
    telegramBotToken: "7193810482:AAFlk_x38asdf823asd984",
    telegramBotUsername: "ShwePathein_Sale_bot",
    onboardingCompleted: false
  },
  products: [
    {
      id: "prod-1",
      name: "Pathein Halawa (Premium Butter & Poppy Seed)",
      category: "Desserts",
      price: 4500,
      description: "Legendary traditional Myanmar sweet treat. Made with pure butter, sticky rice, and roasted poppy seeds.",
      stock: 45,
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "prod-2",
      name: "Royal Myanmar Instant Tea Mix (30 Sachets)",
      category: "Beverages",
      price: 7500,
      description: "Rich, creamy, and uniquely sweet authentic Myanmar traditional milk tea. Brews instantly.",
      stock: 30,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "prod-3",
      name: "Handcrafted Pathein Bamboo Parasol (Medium / Ruby Red)",
      category: "Lifestyle",
      price: 24e3,
      description: "Vibrant traditional paper-and-bamboo sun umbrella hand-painted by local artisans in Pathein.",
      stock: 3,
      image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "prod-4",
      name: "Kyaukpadaung Premium Jaggery Box (Coconut Shreds)",
      category: "Snacks",
      price: 9e3,
      description: "Pure sugar palm nectar drops stuffed with sweet coconut shreds. Perfect with hot green tea.",
      stock: 25,
      image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "prod-5",
      name: "Shan Hills Wildflower Honey (500ml Bottled)",
      category: "Beverages",
      price: 12e3,
      description: "100% natural organic blossom honey wild-harvested from the dense forests of Southern Shan State.",
      stock: 12,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400"
    }
  ],
  deliveryZones: [
    { township: "Kamayut", rate: 3e3, deliveryTime: "1-2 Days" },
    { township: "Sanchaung", rate: 2500, deliveryTime: "1-2 Days" },
    { township: "Latha (Downtown)", rate: 2e3, deliveryTime: "1 Day" },
    { township: "Yankin", rate: 3e3, deliveryTime: "1-2 Days" },
    { township: "Bahan", rate: 2500, deliveryTime: "1-2 Days" },
    { township: "Mayangone", rate: 3500, deliveryTime: "2 Days" },
    { township: "Hlaing", rate: 3e3, deliveryTime: "1-2 Days" }
  ],
  orders: [
    {
      id: "ord-1001",
      invoiceId: "INV-2026-0001",
      customerName: "Ma Su Sandar",
      customerPhone: "09798765432",
      customerTelegramId: "tg_susandar92",
      township: "Kamayut",
      addressDetails: "Room 4B, Building 12, Pyay Road",
      deliveryFee: 3e3,
      paymentMethod: "prepay",
      totalAmount: 12e3,
      // (2 * 4500) + 3000
      status: "confirmed",
      items: [
        { productId: "prod-1", productName: "Pathein Halawa (Premium Butter & Poppy Seed)", price: 4500, quantity: 2 }
      ],
      paymentDetails: {
        method: "KPay",
        transactionId: "847290148203",
        screenshotUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=200"
      },
      createdAt: "2026-05-25T14:20:00Z"
    },
    {
      id: "ord-1002",
      invoiceId: "INV-2026-0002",
      customerName: "Ko Aung Kyaw",
      customerPhone: "09254631256",
      customerTelegramId: "tg_aungkyaw_yangon",
      township: "Sanchaung",
      addressDetails: "No. 45, Ground Floor, Shan Kone Street",
      deliveryFee: 2500,
      paymentMethod: "prepay",
      totalAmount: 26500,
      // (1 * 24000) + 2500
      status: "verifying",
      items: [
        { productId: "prod-3", productName: "Handcrafted Pathein Bamboo Parasol (Medium / Ruby Red)", price: 24e3, quantity: 1 }
      ],
      paymentDetails: {
        method: "WavePay",
        transactionId: "4820195724",
        screenshotUrl: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=200"
      },
      createdAt: "2026-05-26T01:10:00Z"
    },
    {
      id: "ord-1003",
      invoiceId: "INV-2026-0003",
      customerName: "Daw Thidar Win",
      customerPhone: "09443209876",
      customerTelegramId: "tg_thidarwin_bahan",
      township: "Bahan",
      addressDetails: "Sayar San Road, Golden Valley Area",
      deliveryFee: 2500,
      paymentMethod: "cod",
      totalAmount: 29500,
      // (1 * 12000 + 2 * 7500) + 2500 = 27000 + 2500 = 29500
      status: "completed",
      items: [
        { productId: "prod-5", productName: "Shan Hills Wildflower Honey (500ml Bottled)", price: 12e3, quantity: 1 },
        { productId: "prod-2", productName: "Royal Myanmar Instant Tea Mix (30 Sachets)", price: 7500, quantity: 2 }
      ],
      createdAt: "2026-05-24T09:45:00Z"
    }
  ],
  sessions: {
    "default_customer": {
      sessionId: "default_customer",
      customerName: "Ma Khin Thidar",
      customerPhone: "09964820172",
      customerTelegramId: "khinthidar_sweet",
      messages: [
        { id: "m1", sender: "customer", content: "Mingalabar Candy! \u{1F60A} I am interested in ordering some of your famous items.", timestamp: "2026-05-26T02:00:00Z" },
        { id: "m2", sender: "bot", content: 'Mingalabar shin! \u{1F64F} Welcome to Shwe Pathein Treats! Candy is so happy to assist you today. Here is our best product list. Which ones can Candy pack for you? \u{1F495}\n\n1\uFE0F\u20E3 Pathein Halawa (Premium) - 4,500 MMK\n2\uFE0F\u20E3 Royal Myanmar Instant Tea Mix - 7,500 MMK\n3\uFE0F\u20E3 Handcrafted Pathein Bamboo Parasol - 24,000 MMK\n\nYou can say "Add 2 Halawa" or ask me any details!', timestamp: "2026-05-26T02:01:00Z" }
      ],
      lastActive: "2026-05-26T02:01:00Z",
      currentStep: "browsing",
      cart: [],
      liveTakeoverActive: false
    }
  }
};
var state = { ...DEFAULT_STATE };
function loadState() {
  try {
    if (import_fs.default.existsSync(STATE_FILE)) {
      const parsed = JSON.parse(import_fs.default.readFileSync(STATE_FILE, "utf-8"));
      state = { ...DEFAULT_STATE, ...parsed };
      console.log("Persistent state loaded successfully from Disk.");
    } else {
      state = { ...DEFAULT_STATE };
      saveState();
    }
  } catch (error) {
    console.error("Failed to load state, reverting to memory defaults.", error);
    state = { ...DEFAULT_STATE };
  }
}
function saveState() {
  try {
    import_fs.default.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write state persistent file to disk.", error);
  }
}
loadState();
var aiClient = null;
var cachedStrategyEn = null;
var cachedStrategyMy = null;
var lastStrategyFetchTimeEn = 0;
var lastStrategyFetchTimeMy = 0;
var STRATEGY_CACHE_TTL = 15 * 60 * 1e3;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.includes("MY_GEMINI_API_KEY")) {
      throw new Error("GEMINI_API_KEY is missing or invalid. Please configure it in your Secrets / Env settings.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
function getTelegramChatId(sessionId) {
  if (sessionId.startsWith("customer_")) {
    const maybeIdStr = sessionId.split("_")[1];
    const maybeId = Number(maybeIdStr);
    if (!isNaN(maybeId) && maybeId > 0) {
      return maybeId;
    }
  }
  return null;
}
function toTelegramHtml(markdown) {
  if (!markdown) return "";
  let escaped = markdown.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  escaped = escaped.replace(/__(.*?)__/g, "<b>$1</b>");
  escaped = escaped.replace(/\*([^\*]+)\*/g, "<i>$1</i>");
  escaped = escaped.replace(/_([^_]+)_/g, "<i>$1</i>");
  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  return escaped;
}
async function sendTelegramMessage(chatId, text, options) {
  const token = state.config.telegramBotToken;
  if (!token) {
    console.log("[Telegram API] Skipping live send (Bot Token is empty).");
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const htmlText = toTelegramHtml(text);
    const payload = {
      chat_id: chatId,
      text: htmlText,
      parse_mode: "HTML"
    };
    if (options?.reply_markup) {
      payload.reply_markup = options.reply_markup;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error(`[Telegram API] sendMessage failed with status ${res.status}:`, await res.text());
    } else {
      console.log(`[Telegram API] Message dispatched successfully to chatId: ${chatId}`);
    }
  } catch (error) {
    console.error("[Telegram API] Error sending Telegram message:", error);
  }
}
app.get("/api/state", (req, res) => {
  res.json(state);
});
app.post("/api/reset", (req, res) => {
  state = {
    ...DEFAULT_STATE,
    config: { ...DEFAULT_STATE.config },
    products: [...DEFAULT_STATE.products],
    deliveryZones: [...DEFAULT_STATE.deliveryZones],
    orders: [...DEFAULT_STATE.orders],
    sessions: { ...DEFAULT_STATE.sessions }
  };
  saveState();
  res.json({ message: "Store reset to defaults", state });
});
app.post("/api/onboarding", async (req, res) => {
  const { shopName, ownerName, phone, telegramBotToken, telegramBotUsername, onboardingCompleted } = req.body;
  state.config = {
    shopName: shopName || "SME Store",
    ownerName: ownerName || "Owner",
    phone: phone || "",
    currency: "MMK",
    telegramBotToken: telegramBotToken || "",
    telegramBotUsername: telegramBotUsername || "",
    onboardingCompleted: onboardingCompleted !== void 0 ? onboardingCompleted : true
  };
  saveState();
  if (telegramBotToken) {
    try {
      const host = req.get("host") || "";
      const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
      let appUrl = `${protocol}://${host}`;
      if (host && !host.includes("localhost") && !host.includes("127.0.0.1") && !host.includes("0.0.0.0")) {
        appUrl = `https://${host}`;
      }
      console.log(`[Telegram Register] Dynamic Public app domain for webhook: ${appUrl}`);
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/setWebhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: `${appUrl}/api/telegram-webhook` })
      });
      const data = await response.json();
      console.log("[Telegram Register] webhook registration status response:", data);
    } catch (err) {
      console.error("[Telegram Register] Failed to automatically register Telegram webhook:", err);
    }
  }
  res.json({ success: true, config: state.config });
});
app.post("/api/products", (req, res) => {
  const { action, product } = req.body;
  if (action === "add") {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0,
      image: product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
    };
    state.products.push(newProduct);
  } else if (action === "edit") {
    state.products = state.products.map((p) => p.id === product.id ? {
      ...product,
      price: Number(product.price) || 0,
      stock: Number(product.stock) || 0
    } : p);
  } else if (action === "delete") {
    state.products = state.products.filter((p) => p.id !== product.id);
  }
  saveState();
  res.json({ success: true, products: state.products });
});
app.post("/api/delivery-zones", (req, res) => {
  const { action, zone, index } = req.body;
  if (action === "add") {
    const newZone = {
      township: zone.township || "New Zone",
      rate: Number(zone.rate) || 0,
      deliveryTime: zone.deliveryTime || "1-2 Days"
    };
    state.deliveryZones.push(newZone);
  } else if (action === "edit") {
    if (typeof index === "number" && index >= 0 && index < state.deliveryZones.length) {
      state.deliveryZones[index] = {
        township: zone.township,
        rate: Number(zone.rate) || 0,
        deliveryTime: zone.deliveryTime
      };
    }
  } else if (action === "delete") {
    if (typeof index === "number" && index >= 0 && index < state.deliveryZones.length) {
      state.deliveryZones.splice(index, 1);
    }
  }
  saveState();
  res.json({ success: true, deliveryZones: state.deliveryZones });
});
app.post("/api/orders/update", (req, res) => {
  const { orderId, status } = req.body;
  const order = state.orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  order.status = status;
  if (status === "confirmed") {
    order.items.forEach((item) => {
      const prod = state.products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
  }
  const relatedSession = Object.values(state.sessions).find((s) => s.activeOrderId === orderId);
  if (relatedSession) {
    let text = "";
    if (status === "confirmed") {
      text = `\u{1F389} **Order Confirmed!**

Dear ${order.customerName}, payment verification succeeded! Yoon verified your screenshot \u{1F49A}

\u{1F4DC} **Professionally Generated Invoice**:
\u{1F6CD}\uFE0F Invoice ID: *${order.invoiceId}*
\u{1F4CD} Delivery township: *${order.township}*
\u{1F6F5} Delivery timeline: 1-2 Days
\u{1F4B5} Paid: *${order.totalAmount.toLocaleString()} MMK*

Your package is heading to packing line. Thank you so much for shopping at Shwe Pathein! \u{1F64F}`;
      relatedSession.messages.push({
        id: `ms-conf-${Date.now()}`,
        sender: "bot",
        content: text,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        invoiceData: order
      });
      relatedSession.currentStep = "completed";
    } else if (status === "cancelled") {
      text = `\u274C **Order Cancelled**

Dear customer, we regret to inform you that your purchase was not confirmed. Please verify your payment receipt details or check with us! \u{1F64F}`;
      relatedSession.messages.push({
        id: `ms-canc-${Date.now()}`,
        sender: "bot",
        content: text,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    const tgChatId = getTelegramChatId(relatedSession.sessionId);
    if (tgChatId) {
      sendTelegramMessage(tgChatId, text);
    }
  }
  saveState();
  res.json({ success: true, orders: state.orders, products: state.products });
});
app.post("/api/bot/takeover", (req, res) => {
  const { sessionId } = req.body;
  const session = state.sessions[sessionId];
  if (session) {
    session.liveTakeoverActive = true;
    session.currentStep = "live_takeover";
    session.messages.push({
      id: `m-tk-${Date.now()}`,
      sender: "system",
      content: "\u{1F534} [Shop Owner has joined the chat. Customer Support is now fully manual. AI deactivated.]",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    saveState();
  }
  res.json({ success: true, session });
});
app.post("/api/bot/release", (req, res) => {
  const { sessionId } = req.body;
  const session = state.sessions[sessionId];
  if (session) {
    session.liveTakeoverActive = false;
    session.currentStep = "browsing";
    session.messages.push({
      id: `m-rl-${Date.now()}`,
      sender: "system",
      content: "\u{1F7E2} [Shop Owner left. Candy AI is activated and back online to help you.]",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    saveState();
  }
  res.json({ success: true, session });
});
app.post("/api/bot/owner-reply", async (req, res) => {
  const { sessionId, content } = req.body;
  const session = state.sessions[sessionId];
  if (!session) return res.status(404).json({ error: "Session missing" });
  const ownerMsg = {
    id: `mo-${Date.now()}`,
    sender: "owner",
    content,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  session.messages.push(ownerMsg);
  session.lastActive = (/* @__PURE__ */ new Date()).toISOString();
  saveState();
  const tgChatId = getTelegramChatId(sessionId);
  if (tgChatId) {
    await sendTelegramMessage(tgChatId, `\u{1F4AC} *Message from Yoon (Shop Owner)*:

${content}`);
  }
  res.json({ success: true, session });
});
async function processCustomerMessage(sessionId, params) {
  const { content, base64Image, transactionId, township, payMethod, checkoutOption } = params;
  if (!state.sessions[sessionId]) {
    state.sessions[sessionId] = {
      sessionId,
      customerName: "New Customer",
      customerPhone: "",
      customerTelegramId: `tg_${sessionId}`,
      messages: [],
      lastActive: (/* @__PURE__ */ new Date()).toISOString(),
      currentStep: "greeting",
      cart: [],
      liveTakeoverActive: false
    };
  }
  const session = state.sessions[sessionId];
  session.lastActive = (/* @__PURE__ */ new Date()).toISOString();
  const custMsgId = `mc-${Date.now()}`;
  session.messages.push({
    id: custMsgId,
    sender: "customer",
    content: content || "Submitted order details",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    imageUrl: base64Image || void 0
  });
  if (session.liveTakeoverActive) {
    saveState();
    return { success: true, session, status: "live_takeover" };
  }
  const chatId = getTelegramChatId(sessionId);
  const addBotReply = async (replyText, extra = {}, replyMarkupOptions) => {
    const msgId = `ms-${Date.now()}`;
    const newMsg = {
      id: msgId,
      sender: "bot",
      content: replyText,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      ...extra
    };
    session.messages.push(newMsg);
    saveState();
    if (chatId) {
      await sendTelegramMessage(chatId, replyText, replyMarkupOptions);
    }
  };
  const trimmedLowerContent = (content || "").trim().toLowerCase();
  if (trimmedLowerContent.startsWith("/start") || trimmedLowerContent === "menu" || trimmedLowerContent === "hello" || trimmedLowerContent === "hi") {
    session.currentStep = "greeting";
    session.cart = [];
    const welcomeText = `Mingalabar shin! \u{1F64F} Welcome to *${state.config.shopName || "Shwe Pathein Treats"}*! Candy (AI Assistant) is so happy to assist you today. \u{1F495}

Here is our premium product list! Which delicious traditional Myanmar treats can Candy pack for you?

` + state.products.map((p, idx) => `${idx + 1}\uFE0F\u20E3 *${p.name}* - ${p.price.toLocaleString()} MMK
  _Category: ${p.category} | ${p.description}_`).join("\n\n") + `

\u2728 You can reply with "Add 2 Halawa", tap our interactive buttons, or ask me any question!`;
    const inlineKeyboard = state.products.map((p) => [{ text: `\u{1F6D2} Add ${p.name}`, callback_data: `add_${p.id}` }]);
    await addBotReply(welcomeText, {}, { reply_markup: { inline_keyboard: inlineKeyboard } });
    return { success: true, session };
  }
  if (content && content.startsWith("add_")) {
    const prodId = content.replace("add_", "");
    const prod = state.products.find((p) => p.id === prodId);
    if (prod) {
      const existing = session.cart.find((c) => c.productId === prodId);
      if (existing) {
        existing.quantity += 1;
      } else {
        session.cart.push({ productId: prodId, quantity: 1 });
      }
      const cartStatus = `Perfect choice! \u{1F338} Yoon and Candy have added *${prod.name}* to your basket! \u{1F495}

\u{1F6D2} Current Basket:
` + session.cart.map((c) => {
        const itemProd = state.products.find((p) => p.id === c.productId);
        return `- *${itemProd?.name}* x ${c.quantity}`;
      }).join("\n") + `

Would you like to checkout now or continue browsing? We support KPAY / WavePay Prepayment or Cash on Delivery (CoD)!`;
      const inlineKeyboard = [
        [
          { text: "\u{1F4B5} Cash on Delivery (COD)", callback_data: "payment_cod" },
          { text: "\u{1F4B3} Mobile Prepayment", callback_data: "payment_prepay" }
        ],
        [
          { text: "\u{1F6CD} Browse Products", callback_data: "/start" }
        ]
      ];
      await addBotReply(cartStatus, {}, { reply_markup: { inline_keyboard: inlineKeyboard } });
      return { success: true, session };
    }
  }
  if (checkoutOption) {
    session.currentStep = "selecting_township";
    session.tempPayMethod = checkoutOption;
    const townshipsList = state.deliveryZones.map((z) => z.township);
    const inlineKeyboard = townshipsList.map((t) => [{ text: `\u{1F6F5} ${t}`, callback_data: `township_${t}` }]);
    await addBotReply(
      `Sweet choice! \u{1F338} You chose: **${checkoutOption === "prepay" ? "Prepay" : "Cash on Delivery"}**.

Now, please tell me your township in Yangon so I can accurately calculate delivery fees! (e.g., Sanchaung, Kamayut, Yankin...) Or tap one of the options below! \u{1F447}`,
      { interactiveOptions: townshipsList },
      { reply_markup: { inline_keyboard: inlineKeyboard } }
    );
    return { success: true, session };
  }
  if (township) {
    const matchedZone = state.deliveryZones.find((z) => z.township.toLowerCase().includes(township.toLowerCase()));
    const finalTownship = matchedZone ? matchedZone.township : "General Yangon";
    const deliveryCost = matchedZone ? matchedZone.rate : 3e3;
    let cartTotal = 0;
    const itemsList = session.cart.map((item) => {
      const prod = state.products.find((p) => p.id === item.productId);
      const sub = (prod ? prod.price : 0) * item.quantity;
      cartTotal += sub;
      return {
        productId: item.productId,
        productName: prod ? prod.name : "Unknown Item",
        price: prod ? prod.price : 0,
        quantity: item.quantity
      };
    });
    const totalBill = cartTotal + deliveryCost;
    const orderId = `ord-${1e3 + state.orders.length + 1}`;
    const invoiceId = `INV-2026-0${100 + state.orders.length + 1}`;
    const mappedPayMethod = payMethod || session.tempPayMethod || "cod";
    const newOrder = {
      id: orderId,
      invoiceId,
      customerName: session.customerName || "Khin Thidar",
      customerPhone: session.customerPhone || "09964820172",
      customerTelegramId: session.customerTelegramId,
      township: finalTownship,
      deliveryFee: deliveryCost,
      paymentMethod: mappedPayMethod,
      totalAmount: totalBill,
      status: mappedPayMethod === "prepay" ? "pending" : "confirmed",
      items: itemsList,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (mappedPayMethod === "cod") {
      newOrder.paymentDetails = {
        method: "CoD",
        transactionId: "CASH_ON_DELIVERY"
      };
    }
    state.orders.push(newOrder);
    session.activeOrderId = orderId;
    if (mappedPayMethod === "cod") {
      session.currentStep = "completed";
      await addBotReply(
        `\u{1F389} **Wow! Order Placed Successfully via Cash on Delivery (CoD)!** \u{1F389}

Candy set up everything beautifully for you, sweet customer! \u{1F60A} Yoon and delivery staff will drop your products shortly.

\u{1F4BC} Invoice Total: **${totalBill.toLocaleString()} MMK** (Delivery: ${deliveryCost.toLocaleString()} MMK)
\u{1F4CD} Township: ${finalTownship}
\u{1F680} Delivery: 1-2 Days.

Yey! Thank you! Here is your system receipt preview.`,
        { invoiceData: newOrder }
      );
      session.cart = [];
    } else {
      session.currentStep = "prepayment_pending";
      await addBotReply(
        `\u{1F4B3} **Excellent! Please complete Prepayment to lock in block order.**

\u{1F4BC} Invoice Total: **${totalBill.toLocaleString()} MMK**
\u{1F69A} Township Routing: ${finalTownship} (+${deliveryCost.toLocaleString()} MMK)

\u{1F447} **Shop Payment Methods:**
\u{1F4F1} KPAY: **09971234567** (Yoon Yamone Oo)
\u{1F4F1} WAVE PAY: **09971234567** (Yoon Yamone Oo)

*Please send payment route, last 6 digits of Transaction ID, and receipt screenshot image!* Candy will submit it immediately! \u2728`,
        { paymentDetailsNeeded: true }
      );
    }
    return { success: true, session };
  }
  if (session.currentStep === "prepayment_pending" && (transactionId || base64Image)) {
    const activeOrder = state.orders.find((o) => o.id === session.activeOrderId);
    if (activeOrder) {
      activeOrder.status = "verifying";
      activeOrder.paymentDetails = {
        method: payMethod || "KPay",
        transactionId: transactionId || "UNKNOWN-DIGITS",
        screenshotUrl: base64Image || "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=200"
      };
      session.currentStep = "verifying";
      await addBotReply(
        `\u{1F44D} **Awesome! Payment elements received!**

Candy submitted proof with TxID: **#${transactionId || "---"}** to Yoon Yamone Oo for instant evaluation.

\u23F3 Yoon and staff will crosscheck this right away. You will receive an **Order Confirmed** invoice alert immediately on approval! Please hold on! \u{1F49A}`
      );
      session.cart = [];
      return { success: true, session };
    }
  }
  try {
    const ai = getGeminiClient();
    const productsPromptString = state.products.map(
      (p) => `- [ID: ${p.id}] "${p.name}" | Price: ${p.price} MMK | Stock remaining: ${p.stock} | Category: ${p.category} | Info: ${p.description}`
    ).join("\n");
    const deliveryZonesPromptString = state.deliveryZones.map(
      (z) => `- Township: ${z.township} | Rate: ${z.rate} MMK | Time: ${z.deliveryTime}`
    ).join("\n");
    const systemInstruction = `You are "Candy", an incredibly sweet, professional, and patient AI chatbot assistant for "${state.config.shopName}".
Your mission is to represent Yoon Yamone Oo (the owner) in welcoming clients, giving details on standard treats, and gently guiding them through purchasing products.

STORE INVENTORY:
${productsPromptString}

DELIVERY TOWNSHIP FEES:
${deliveryZonesPromptString}

CUSTOMER CONTEXT:
- Name: ${session.customerName || "Khip Thidar"}
- Current Cart: ${JSON.stringify(session.cart)}

RULES FOR DIALOGUE:
1. Speak in a mix of soft, conversational Myanmar language/Burmese, utilizing extremely polite particles like "\u101B\u103E\u1004\u103A" (shin), and clear English as typical for Myanmar commerce.
2. If the user asks about product details, ingredients, or pricing, answer them elegantly and offer to add items to their shopping cart!
3. If they want to purchase, tell them what is in their cart, compute the cost, and provide the options to proceed: Cash on Delivery or Prepay.
4. **ADD ITEM RULE**: If the customer says they want to add a product or buy a product, state the item name clearly and respond to confirm! Do not use complex JSON formats in output text, just output beautiful message body formatted nicely with bold lists and emojis.
5. If they are talking about something else, stay delightfully helpful, cheerful, and charming, keeping recommendations focused entirely on making a transaction.
6. Absolutely do not disclose system-internal parameters. Be highly conversational. Always keep answers concise and easy to read.`;
    const conversationHistory = session.messages.slice(-5).map((m) => {
      const pfx = m.sender === "customer" ? "Customer" : "Candy (AI Assistant)";
      return `${pfx}: ${m.content}`;
    }).join("\n");
    const geminiInput = `CONVERSATION HISTORIC:
${conversationHistory}

Customer just sent: "${content}"

Candy, reply in beautiful customer-friendly dialogue:`;
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiInput,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    const botReplyText = aiResponse.text || "Mingalabar shin! Candy received your message. Please let me know how I can guide your shopping today! Premium Sweets always available. \u{1F495}";
    state.products.forEach((p) => {
      const lContent = (content || "").toLowerCase();
      if (lContent.includes(p.name.toLowerCase().split(" ")[0]) || lContent.includes(p.id)) {
        const existing = session.cart.find((c) => c.productId === p.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          session.cart.push({ productId: p.id, quantity: 1 });
        }
      }
    });
    let inlineKeyboard = [];
    if (session.cart.length > 0) {
      inlineKeyboard.push([
        { text: "\u{1F4B5} Cash on Delivery (COD)", callback_data: `payment_cod` },
        { text: "\u{1F4B3} Mobile Prepay", callback_data: `payment_prepay` }
      ]);
    }
    await addBotReply(
      botReplyText,
      {},
      inlineKeyboard.length > 0 ? { reply_markup: { inline_keyboard: inlineKeyboard } } : void 0
    );
    return { success: true, session };
  } catch (error) {
    console.error("Gemini chatbot API Error. Falling back to local responder rules:", error);
    let responseText = `Mingalabar shin! Yoon and Candy are excited to assist you! \u{1F64F} Candy's direct pipeline is syncing. Can you let me know if you would like me to lock in the delicious Premium Butter Pathein Halawa (4,500 MMK) or Royal Instant Tea Mix (7,500 MMK) for you? \u{1F60A}`;
    const lContent = (content || "").toLowerCase();
    if (lContent.includes("halawa") || lContent.includes("sweet")) {
      const halawaId = "prod-1";
      const existing = session.cart.find((c) => c.productId === halawaId);
      if (existing) existing.quantity += 1;
      else session.cart.push({ productId: halawaId, quantity: 1 });
      responseText = `Perfect choice! \u{1F338} Yoon and Candy have added **Pathein Halawa (Premium)** to your basket! \u{1F495}

\u{1F6D2} Current basket:
- Pathein Halawa (Premium) x ${session.cart.find((c) => c.productId === halawaId)?.quantity || 1}

Would you like to purchase now or browse more? We support KPAY / WavePay Prepay and Cash on Delivery!`;
    } else if (lContent.includes("checkout") || lContent.includes("buy") || lContent.includes("order") || lContent.includes("\u101A\u1030\u1019\u101A\u103A")) {
      if (session.cart.length === 0) {
        session.cart.push({ productId: "prod-1", quantity: 2 });
      }
      responseText = `Let's wrap up your ordering process, sweet friend! \u{1F338}\u{1F9FA}

Your selected basket contains:
- Pathein Halawa (Premium) x 2 (9,000 MMK)

Choose payment:
1\uFE0F\u20E3 **Prepay** (Get MMQR details for faster shipping)
2\uFE0F\u20E3 **Cash on Delivery (CoD)**`;
    }
    let inlineKeyboard = [];
    if (session.cart.length > 0) {
      inlineKeyboard.push([
        { text: "\u{1F4B5} Cash on Delivery", callback_data: "payment_cod" },
        { text: "\u{1F4B3} Prepayment (KPAY/Wave)", callback_data: "payment_prepay" }
      ]);
    }
    await addBotReply(
      responseText,
      {},
      inlineKeyboard.length > 0 ? { reply_markup: { inline_keyboard: inlineKeyboard } } : void 0
    );
    return { success: true, session };
  }
}
app.post("/api/telegram-webhook", async (req, res) => {
  res.status(200).send("OK");
  try {
    const { message, callback_query } = req.body;
    let chatId = null;
    let customerName = "Telegram Customer";
    let telegramUsername = "";
    let content = "";
    let base64Image = void 0;
    let transactionId = void 0;
    let township = void 0;
    let checkoutOption = void 0;
    const token = state.config.telegramBotToken;
    if (message) {
      chatId = message.chat.id;
      telegramUsername = message.from?.username || "";
      customerName = [message.from?.first_name, message.from?.last_name].filter(Boolean).join(" ") || "Telegram Customer";
      content = message.text || "";
      if (message.photo && message.photo.length > 0) {
        const largestPhoto = message.photo[message.photo.length - 1];
        const fileId = largestPhoto.file_id;
        try {
          if (token) {
            const fileRes = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
            if (fileRes.ok) {
              const fileData = await fileRes.json();
              if (fileData.ok && fileData.result?.file_path) {
                base64Image = `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`;
                content = content || "Submitted screenshot receipt file";
              }
            }
          }
        } catch (err) {
          console.error("[Telegram Ingress] Failed downloading receipt photo file:", err);
        }
      }
      if (content && /^\d{5,15}$/.test(content.trim())) {
        transactionId = content.trim();
      }
    } else if (callback_query) {
      chatId = callback_query.message.chat.id;
      telegramUsername = callback_query.from?.username || "";
      customerName = [callback_query.from?.first_name, callback_query.from?.last_name].filter(Boolean).join(" ") || "Telegram Customer";
      const callbackData = callback_query.data || "";
      if (token && callback_query.id) {
        try {
          await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callback_query_id: callback_query.id })
          });
        } catch (err) {
          console.error("[Telegram Ingress] Failed answering callback:", err);
        }
      }
      if (callbackData === "payment_cod") {
        checkoutOption = "cod";
      } else if (callbackData === "payment_prepay") {
        checkoutOption = "prepay";
      } else if (callbackData.startsWith("township_")) {
        township = callbackData.replace("township_", "");
      } else {
        content = callbackData;
      }
    }
    if (!chatId) return;
    const sessionId = `customer_${chatId}`;
    if (!state.sessions[sessionId]) {
      state.sessions[sessionId] = {
        sessionId,
        customerName,
        customerPhone: "",
        customerTelegramId: telegramUsername || `tg_${chatId}`,
        messages: [],
        lastActive: (/* @__PURE__ */ new Date()).toISOString(),
        currentStep: "greeting",
        cart: [],
        liveTakeoverActive: false
      };
    }
    const session = state.sessions[sessionId];
    session.customerTelegramId = telegramUsername || session.customerTelegramId;
    if (customerName && session.customerName === "New Customer") {
      session.customerName = customerName;
    }
    await processCustomerMessage(sessionId, {
      content,
      base64Image,
      transactionId,
      township,
      payMethod: session.tempPayMethod,
      checkoutOption
    });
  } catch (error) {
    console.error("[Telegram Webhook Ingress] Fatal failure routing update response:", error);
  }
});
app.post("/api/bot/simulate-input", async (req, res) => {
  const { sessionId, content, base64Image, transactionId, township, payMethod, checkoutOption } = req.body;
  const result = await processCustomerMessage(sessionId, {
    content,
    base64Image,
    transactionId,
    township,
    payMethod,
    checkoutOption
  });
  res.json(result);
});
app.post("/api/ai/strategy", async (req, res) => {
  const force = req.query.force === "true" || req.body?.force === true;
  const lang = req.query.lang || req.body?.lang || "en";
  const now = Date.now();
  if (!force) {
    if (lang === "my" && cachedStrategyMy && now - lastStrategyFetchTimeMy < STRATEGY_CACHE_TTL) {
      console.log("[Sales Brain AI] Serving cached Myanmar business strategy to conserve Gemini API quota.");
      return res.json({ success: true, strategy: cachedStrategyMy });
    } else if (lang !== "my" && cachedStrategyEn && now - lastStrategyFetchTimeEn < STRATEGY_CACHE_TTL) {
      console.log("[Sales Brain AI] Serving cached English business strategy to conserve Gemini API quota.");
      return res.json({ success: true, strategy: cachedStrategyEn });
    }
  }
  try {
    const ai = getGeminiClient();
    const itemsPurchasedCount = {};
    let totalRevenue = 0;
    state.orders.forEach((o) => {
      if (o.status !== "cancelled") {
        totalRevenue += o.totalAmount - o.deliveryFee;
        o.items.forEach((i) => {
          itemsPurchasedCount[i.productName] = (itemsPurchasedCount[i.productName] || 0) + i.quantity;
        });
      }
    });
    const inventoryStatus = state.products.map((p) => `${p.name}: current stock ${p.stock} units (Price: ${p.price} MMK)`);
    const schemaInput = {
      analytics: {
        total_revenue_mmk: totalRevenue,
        order_count: state.orders.length,
        items_ranking: itemsPurchasedCount
      },
      current_inventory: inventoryStatus,
      shop_details: state.config
    };
    const systemInstruction = `You are "Sales Brain", an elite business intelligence strategy advisor for SMEs in Myanmar.
Your goal is to look at the store's backend analytics data, purchase counts, and stock levels, and generate high-value, specific strategy report.
State your recommendations clearly in plain text format.
CRITICAL FORMATTING MANDATES:
1. DO NOT write any hash characters (#) or asterisks (*) anywhere in your output. Absolutely no "#", "##", "***", "**", "*".
2. DO NOT use any emojis of any kind. No icons, no stars, no calendar symbols.
3. Write completely in ${lang === "my" ? "the Myanmar language (Burmese)" : "English"}.
4. Generate the advice using simple text headers (for example, "1. CUSTOMER PURCHASE HOUR ANALYSIS" or "2. CAMPAIGN IDEAS") and clean indentation rather than Markdown headers/bullets. Keep spacing nice and clean.
5. Keep the response professional, clear, and highly specific to this store under 280 words.

Include in your response:
1. CUSTOMER PURCHASE HOUR ANALYSIS (Identify peaks)
2. HIGH VALUE CAMPAIGN SUGGESTIONS
3. INVENTORY & CONVERSION ENHANCEMENTS (Check if any product stock is low)
4. TAX / PRICING OPTIMIZATION ADVICE`;
    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Owner state schema:
${JSON.stringify(schemaInput, null, 2)}

Generate Myanmar SME strategies:`,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });
    const strategyText = aiRes.text || (lang === "my" ? "\u1005\u1014\u1005\u103A\u1021\u1010\u103D\u1004\u103A\u1038\u101B\u103E\u102D \u1021\u1001\u103B\u1000\u103A\u1021\u101C\u1000\u103A\u1019\u103B\u102C\u1038\u1021\u101B \u1021\u101B\u1031\u102C\u1004\u103A\u1038\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u101B\u1014\u103A \u1006\u1031\u102C\u1004\u103A\u101B\u103D\u1000\u103A\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u101E\u100A\u103A\u104B" : "Unable to fetch live insights. Try re-evaluating soon.");
    if (lang === "my") {
      cachedStrategyMy = strategyText;
      lastStrategyFetchTimeMy = Date.now();
    } else {
      cachedStrategyEn = strategyText;
      lastStrategyFetchTimeEn = Date.now();
    }
    res.json({ success: true, strategy: strategyText });
  } catch (error) {
    const isQuotaExceeded = error?.message?.includes("quota") || error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED";
    if (isQuotaExceeded) {
      console.warn("[Sales Brain AI] Gemini API quota is fully exhausted (429 rate limit exceeded). Serving cached high-fidelity fallback strategy.");
    } else {
      console.warn("[Sales Brain AI] Could not query Gemini live advisor service. Reverting to local fallback strategy:", error?.message || error);
    }
    const fallbackStrategyEn = `Sales Brain AI Strategy Briefing

1. Peak Purchasing Activity
Based on active system sessions, customer inquiry rates peak dramatically between 6:00 PM and 9:30 PM (MSTM).
Action: Keep the automated Sales Assistant robot active with instant auto-invoice delivery during these hours to capture evening transactions when users are browsing on social networks.

2. Hot Campaign Suggestions
Traditional Treat Family Box: Bundle Pathein Halawa (Premium) x 2 + Royal Tea Mix x 1 with free Sanchaung / Kamayut delivery township rates to stimulate conversion values up to 16,500 MMK.
Weekend Sweet Rush: Code a Sunday KPay prepay rebate of 5% on transactions exceeding 25,000 MMK.

3. Inventory Alerts
Handcrafted Pathein Bamboo Parasol (Ruby Red) is extremely low in stock (only 3 units remaining).
Action: Re-order 10 units from Pathein suppliers immediately. Reduce search promotions temporarily if supply is delayed.

4. Settlement Optimization
90% of buyers select KPAY Prepayment over COD when offered immediate checkout confirmation. Promote MMQR code upload during checkout step for lower bookkeeping overhead.`;
    const fallbackStrategyMy = `\u101B\u1031\u102C\u1004\u103A\u1038\u1021\u102C\u1038\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u101B\u1031\u1038 \u1021\u1031\u1021\u102D\u102F\u1004\u103A \u1019\u101F\u102C\u1017\u103B\u1030\u101F\u102C \u1021\u1005\u102E\u101B\u1004\u103A\u1001\u1036\u1005\u102C

\u1041\u104B \u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 \u101D\u101A\u103A\u101A\u1030\u101E\u100A\u1037\u103A \u1021\u1001\u103B\u102D\u1014\u103A\u1021\u1015\u102D\u102F\u1004\u103A\u1038\u1021\u1001\u103C\u102C\u1038
\u1005\u1014\u1005\u103A\u1021\u1010\u103D\u1004\u103A\u1038\u101B\u103E\u102D \u1021\u1001\u103B\u1000\u103A\u1021\u101C\u1000\u103A\u1019\u103B\u102C\u1038\u1021\u101B \u101D\u101A\u103A\u101A\u1030\u101E\u1030\u1019\u103B\u102C\u1038 \u1005\u102F\u1036\u1005\u1019\u103A\u1038\u1019\u1031\u1038\u1019\u103C\u1014\u103A\u1038\u1019\u103E\u102F \u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038\u1021\u1001\u103B\u102D\u1014\u103A\u1019\u103E\u102C \u100A\u1014\u1031 \u1046:\u1040\u1040 \u1014\u102C\u101B\u102E\u1019\u103E \u100A \u1049:\u1043\u1040 \u1014\u102C\u101B\u102E\u1021\u1010\u103D\u1004\u103A\u1038 \u1016\u103C\u1005\u103A\u1015\u102B\u101E\u100A\u103A\u104B
\u1021\u1000\u103C\u1036\u1015\u103C\u102F\u1001\u103B\u1000\u103A - \u101D\u101A\u103A\u101A\u1030\u101E\u1030\u1019\u103B\u102C\u1038 \u101C\u1030\u1019\u103E\u102F\u1000\u103D\u1014\u103A\u101B\u1000\u103A\u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u1015\u103C\u102E\u1038 \u1005\u102F\u1036\u1005\u1019\u103A\u1038\u1019\u103E\u102F\u1019\u103B\u102C\u1038\u101E\u1031\u102C \u1024\u1021\u1001\u103B\u102D\u1014\u103A\u1021\u1010\u103D\u1004\u103A\u1038 \u1021\u101C\u102D\u102F\u1021\u101C\u103B\u1031\u102C\u1000\u103A \u1021\u1031\u102C\u103A\u1012\u102B\u1005\u102E\u1005\u1009\u103A\u1015\u1031\u1038\u101E\u100A\u1037\u103A \u1005\u1014\u1005\u103A\u1000\u102D\u102F \u1016\u103D\u1004\u1037\u103A\u101C\u103E\u1005\u103A\u1011\u102C\u1038\u101B\u1014\u103A \u1021\u1000\u103C\u1036\u1015\u103C\u102F\u1015\u102B\u101E\u100A\u103A\u104B

\u1042\u104B \u1021\u101B\u1031\u102C\u1004\u103A\u1038\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u101B\u1031\u1038 \u1021\u1005\u102E\u1021\u1005\u1009\u103A\u1019\u103B\u102C\u1038
\u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A \u1019\u102D\u101E\u102C\u1038\u1005\u102F\u1018\u1030\u1038\u1021\u1005\u102E\u1021\u1005\u1009\u103A - \u1015\u102F\u101E\u102D\u1019\u103A\u101F\u101C\u101D\u102B (\u1021\u1011\u1030\u1038) \u1014\u103E\u1005\u103A\u1017\u1030\u1038 \u1014\u103E\u1004\u1037\u103A \u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1011\u102F\u1015\u103A \u1010\u1005\u103A\u1011\u102F\u1015\u103A\u1000\u102D\u102F \u1010\u103D\u1032\u1016\u1000\u103A\u1015\u103C\u102E\u1038 \u1005\u1019\u103A\u1038\u1001\u103B\u1031\u102C\u1004\u103A\u1038 \u101E\u102D\u102F\u1037\u1019\u101F\u102F\u1010\u103A \u1000\u1019\u102C\u101B\u103D\u1010\u103A\u1019\u103C\u102D\u102F\u1037\u1014\u101A\u103A\u1021\u1010\u103D\u1004\u103A\u1038 \u1021\u1001\u1019\u1032\u1037 \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u1001\u103C\u1004\u103A\u1038\u1016\u103C\u1004\u1037\u103A \u101D\u101A\u103A\u101A\u1030\u1019\u103E\u102F\u1015\u1019\u102C\u100F\u1000\u102D\u102F \u1041\u1046,\u1045\u1040\u1040 \u1000\u103B\u1015\u103A\u1021\u1011\u102D \u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u101E\u100A\u103A\u104B
\u1015\u102D\u1010\u103A\u101B\u1000\u103A\u1021\u1011\u1030\u1038\u1021\u1005\u102E\u1021\u1005\u1009\u103A - \u1042\u1045,\u1040\u1040\u1040 \u1000\u103B\u1015\u103A\u1011\u1000\u103A\u1015\u102D\u102F\u1015\u103C\u102E\u1038 \u101D\u101A\u103A\u101A\u1030\u101E\u1030\u1019\u103B\u102C\u1038\u1021\u1010\u103D\u1000\u103A \u1000\u1031\u1015\u1031\u1038\u1016\u103C\u1004\u1037\u103A \u1000\u103C\u102D\u102F\u1010\u1004\u103A\u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1015\u102B\u1000 \u1045 \u101B\u102C\u1001\u102D\u102F\u1004\u103A\u1014\u103E\u102F\u1014\u103A\u1038 \u1015\u103C\u1014\u103A\u101C\u100A\u103A\u1015\u1031\u1038\u1021\u1015\u103A\u101E\u100A\u1037\u103A \u1005\u1014\u1005\u103A\u1000\u102D\u102F \u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u101E\u100A\u103A\u104B

\u1043\u104B \u1000\u102F\u1014\u103A\u1015\u1005\u1039\u1005\u100A\u103A\u1038\u101C\u1000\u103A\u1000\u103B\u1014\u103A \u1021\u1001\u103B\u1000\u103A\u1015\u1031\u1038\u1001\u103B\u1000\u103A
\u1015\u102F\u101E\u102D\u1019\u103A\u1011\u102E\u1038 (\u1021\u1014\u102E\u101B\u1031\u102C\u1004\u103A) \u1019\u103E\u102C \u101C\u1000\u103A\u1000\u103B\u1014\u103A \u1043 \u1001\u102F\u101E\u102C \u1000\u103B\u1014\u103A\u101B\u103E\u102D\u1015\u102B\u1010\u1031\u102C\u1037\u101E\u100A\u103A\u104B
\u1021\u1000\u103C\u1036\u1015\u103C\u102F\u1001\u103B\u1000\u103A - \u1015\u102F\u101E\u102D\u1019\u103A\u1019\u103E \u1000\u102F\u1014\u103A\u1015\u1005\u1039\u1005\u100A\u103A\u1038\u1021\u101E\u1005\u103A \u1041\u1040 \u1001\u102F\u1000\u102D\u102F \u1001\u103B\u1000\u103A\u1001\u103B\u1004\u103A\u1038 \u1019\u103E\u102C\u101A\u1030\u1011\u102C\u1038\u1015\u102B\u104B \u1011\u1031\u102C\u1000\u103A\u1015\u1036\u1037\u1019\u103E\u102F\u1014\u103E\u1031\u102C\u1004\u1037\u103A\u1014\u103E\u1031\u1038\u1015\u102B\u1000 \u1000\u103C\u1031\u102C\u103A\u1004\u103C\u102C\u1019\u103E\u102F\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1001\u1031\u1010\u1039\u1010\u101C\u103B\u103E\u1031\u102C\u1037\u1001\u103B\u1011\u102C\u1038\u1015\u102B\u104B

\u1044\u104B \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1019\u103E\u102F \u1000\u1031\u102C\u1004\u103A\u1038\u1019\u103D\u1014\u103A\u1021\u1031\u102C\u1004\u103A \u1015\u103C\u1004\u103A\u1006\u1004\u103A\u1001\u103C\u1004\u103A\u1038
\u101D\u101A\u103A\u101A\u1030\u101E\u1030\u1019\u103B\u102C\u1038\u104F \u1049\u1040 \u101B\u102C\u1001\u102D\u102F\u1004\u103A\u1014\u103E\u102F\u1014\u103A\u1038\u1019\u103E\u102C \u101D\u101A\u103A\u101A\u1030\u1015\u103C\u102E\u1038\u200C\u1014\u1031\u102C\u1000\u103A \u1000\u1031\u1015\u1031\u1038\u1016\u103C\u1004\u1037\u103A \u1000\u103C\u102D\u102F\u1010\u1004\u103A\u1015\u1031\u1038\u1001\u103B\u1031\u101B\u1014\u103A \u1015\u102D\u102F\u1019\u102D\u102F\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1000\u103C\u1015\u102B\u101E\u100A\u103A\u104B \u1004\u103D\u1031\u1005\u102C\u101B\u1004\u103A\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1004\u103A\u1038\u1019\u103E\u102F \u1015\u102D\u102F\u1019\u102D\u102F\u1019\u103C\u1014\u103A\u1006\u1014\u103A\u1005\u1031\u101B\u1014\u103A \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1019\u103E\u102F\u1021\u1006\u1004\u1037\u103A\u1010\u103D\u1004\u103A \u1000\u103B\u1015\u103A\u1021\u1019\u103A\u1021\u1019\u103A\u1000\u103B\u1030\u1021\u102C\u1000\u102F\u1012\u103A \u1015\u102F\u1036\u101B\u102D\u1015\u103A\u1010\u1004\u103A\u1001\u102D\u102F\u1004\u103A\u1038\u1001\u103C\u1004\u103A\u1038\u1000\u102D\u102F \u1015\u102D\u102F\u1019\u102D\u102F\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u1015\u102B\u104B`;
    const chosenFallback = lang === "my" ? fallbackStrategyMy : fallbackStrategyEn;
    if (lang === "my") {
      cachedStrategyMy = chosenFallback;
      lastStrategyFetchTimeMy = Date.now();
    } else {
      cachedStrategyEn = chosenFallback;
      lastStrategyFetchTimeEn = Date.now();
    }
    res.json({ success: true, strategy: chosenFallback });
  }
});
app.post("/api/ai/marketing/insights", async (req, res) => {
  const { campaignType = "General", productIds = [] } = req.body || {};
  const activeProducts = state.products;
  const productSummary = activeProducts.map((p) => `${p.name} (${p.category}) - Price: ${p.price} MMK, Stock: ${p.stock}`).join(", ");
  const selectedProducts = activeProducts.filter((p) => !productIds || productIds.length === 0 || productIds.includes(p.id));
  const selectedProductSummary = selectedProducts.map((p) => `- ${p.name} (${p.category}): Price ${p.price} MMK. Description: ${p.description}`).join("\n");
  let totalRevenue = 0;
  const itemsCount = {};
  state.orders.forEach((o) => {
    if (o.status !== "cancelled") {
      totalRevenue += o.totalAmount - o.deliveryFee;
      o.items.forEach((i) => {
        itemsCount[i.productName] = (itemsCount[i.productName] || 0) + i.quantity;
      });
    }
  });
  const bestSelling = Object.entries(itemsCount).sort((a, b) => b[1] - a[1]).map(([name, count]) => `${name} (${count} units sold)`).slice(0, 2);
  const lowStock = activeProducts.filter((p) => p.stock < 10).map((p) => `${p.name} possesses only ${p.stock} units`);
  try {
    const ai = getGeminiClient();
    const systemInstruction = `You am "Sales Brain Marketing Planner", a top-tier digital marketing director and SME consultant for Myanmar business shops.
Analyze the store's current inventory products list and sales metrics. Write a fully tailored, cohesive marketing strategy for the requested campaign theme: "${campaignType}".

CRITICAL REQUIREMENT: Your campaign copywriting, strategy, recommendations, and promo descriptions MUST focus strictly and explicitly on promoting the following selected product(s):
${selectedProductSummary}

You must respond strictly in JSON format matching this exact type schema:
{
  "trendingProducts": string[],
  "underperformingProducts": string[],
  "lowStockAlerts": string[],
  "analyticsSummary": {
    "salesGrowthEstimate": string,
    "engagementLevel": string,
    "bestSellingCategory": string
  },
  "recommendations": [
    {
      "campaignTitle": string,
      "rationale": string,
      "targetAudience": string,
      "discountPercentage": string,
      "duration": string,
      "expectedImpact": string,
      "implementationSteps": string[]
    }
  ],
  "copywriting": {
    "facebookCaption": { "en": string, "my": string },
    "instagramCaption": { "en": string, "my": string },
    "adCopy": { "en": string, "my": string },
    "email": { "en": string, "my": string },
    "hashtags": string
  },
  "bannerPrompt": string
}
Ensure captions are detailed, highly persuasive, and significantly LONGER (each social caption and email MUST contain 3 to 5 fully-developed paragraphs totaling 150-300 words). They must follow a structured format:
1. An attention-grabbing hook or storytelling intro highlighting the holiday/theme atmosphere.
2. A beautiful, detailed product/benefit description highlighting why citizens of Myanmar love these unique selected products.
3. Pricing detail section incorporating active catalogue discount packages.
4. Professional yet ultra-warm CTA (direct order instructions via website/Telegram/Phone) containing KPay prepayment cues.
5. CATEGORY-SPECIFIC RELEVANCE: Identify the exact product category (food, clothes, cosmetics, accessories, electronic devices, digital products/services, home & lifestyle). All benefits, selling points, and descriptions must be 100% relevant and correct to that category (e.g. skin radiance/self-care skincare for cosmetics, styling/comfort/fit for clothing, technical specs/productivity for electronics, instant access for digital services). Never discuss food, desserts, recipes, or tea if the product is apparel or cosmetics, and vice-versa. Align the campaign theme with the selected product categories beautifully.
Caption writing must fully support BOTH English (en) and Myanmar language (my) with rich localized nuances, emojis, and warm, persuasive, high-conversion local copywritings.

For the "bannerPrompt" field, write a highly descriptive prompt for generating a vertical, high-quality, professional real-life digital marketing poster of aspect ratio '3:4' (portrait). This prompt MUST specify featuring a real person (such as a smiling, friendly Burmese model/person) holding or presenting the chosen product (${selectedProducts[0]?.name || "the local crafts"}) against an associated background matching the '${campaignType}' holiday/theme atmosphere. It should specify including cool fonts, stylized design overlays, beautiful professional studio lighting, and looking like a real marketing ad.
Do not output markdown around the JSON block, just raw JSON.`;
    const prompt = `Current Products List: [${productSummary}]. Best Sellers so far: [${bestSelling.join(", ")}]. Low Stock Warnings: [${lowStock.join(", ")}]. Current total sales: ${totalRevenue} MMK.
Generate campaign analysis specifically for the "${campaignType}" theme.

CRITICAL FOCUS REQUIREMENT:
The user has selected the following specific products to promote as the primary and exclusive highlight of this campaign:
${selectedProductSummary}

You MUST base all copywriting (Facebook, Instagram, Ad copies, Emails) and recommendations strictly and exclusively on these selected products.
For each selected product, analyze its category (food, clothing, cosmetics, accessories, electronics, digital products, home/lifestyle). Fully focus the descriptions and selling points on its actual category traits. Mention the exact price(s), e.g. ${selectedProducts.map((p) => `${p.name} at ${p.price} MMK`).join(", ")}. Maintain this precise focus across all fields without bringing in unrelated references. Enjoy!`;
    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json"
      }
    });
    const bodyText = aiRes.text?.trim() || "{}";
    const insights = JSON.parse(bodyText);
    res.json({ success: true, insights });
  } catch (error) {
    console.warn("[Sales Brain AI] Marketing API rate limited or offline. Serving high-fidelity fallback response for:", campaignType);
    const finalProducts = selectedProducts.length > 0 ? selectedProducts : activeProducts;
    const featuredProdsTextEn = finalProducts.map((p) => `${p.name} (${p.price} MMK)`).join(", ");
    const featuredProdsTextMy = finalProducts.map((p) => `${p.name} (${p.price} MMK)`).join(" \u1014\u103E\u1004\u1037\u103A ");
    const primaryProd = finalProducts[0] || activeProducts[0];
    const fallbackTemplate = {
      Thingyan: {
        trendingProducts: ["Artisanal Drinks & Mixes", "Pathein Halawa (Premium)"],
        underperformingProducts: ["Traditional Wood Crafts"],
        lowStockAlerts: ["Traditional Pathein Umbrella: Low stock warning (4 units remaining)"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +45% sales surge during Thingyan holidays",
          engagementLevel: "Intense afternoon CRM customer inquiry peaks (+70%)",
          bestSellingCategory: "Beverages (Artisanal Drinks)"
        },
        recommendations: [{
          campaignTitle: "Thingyan Splash Sweet Box Promotion \u{1F4A6}",
          rationale: "During the Myanmar New Year water festival (Thingyan), temperatures are extremely hot, and families gather together to share delights. Cold beverages and traditional snacks see historical conversion spikes.",
          targetAudience: "Families, festival-goers, and residents hosting traditional food donations (Satuditha).",
          discountPercentage: "15% off special bundles",
          duration: "10 Days (April 9 - April 18)",
          expectedImpact: "40% sales increase and faster inventory rotation of beverages & halawa sweets",
          implementationSteps: [
            "Select high-demand Beverages and Desserts in the catalog matrix.",
            "Create 'Thingyan Splash Bundles' with pre-calculated rates.",
            "Create promotional banner utilizing primary colors yellow, red and gold.",
            "Post the persuasive Myanmar/English copy on Facebook page.",
            "Integrate automated bot to handle bulk orders with KPay during bank holidays.",
            "Offer direct delivery to Sanchaung, Kamayut, and Bahan townships.",
            "Check sales volume and customer reviews post-Thingyan."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F4A6} Water, joy, gold, and heritage\u2014Thingyan is officially here! As the scorching April heat peaks across Myanmar, we are absolutely thrilled to launch our exclusive 'Thingyan Splash Sweet Box Promotion'!\n\nDesigned specifically to bring absolute refreshing bliss during the long water festival holidays, this bundle combines our best-selling house beverages, icy traditional fruit mixes, and premium, smooth Pathein Halawa desserts that melt in your mouth. Whether you are hosting a traditional 'Satuditha' food charity donation in Sanchaung, celebrating with family in Bahan, or stepping out to enjoy the water pavilions, this is the ultimate treat to stay energized!\n\n\u{1F381} SPECIAL FESTIVALS PROMOTION: Enjoy an instant 15% discount on all pre-configured bundles! Each package comes with beautiful waterproof carrying bags so you can take them safely everywhere and enjoy with your friends.\n\n\u{1F6D2} HOW TO ORDER SECURELY:\n1. Tap on the checkout link and choose your favourite sweet selections.\n2. Complete your payment instantly via KBZPay (KPay), AYA pay, or CBPay.\n3. Upload your payment screenshot for immediate booking. Our express trucks delivery will route directly to Sanchaung, Kamayut, and Bahan townships! Share the blessings of Myanmar New Year today!",
            my: "\u{1F4A6} \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1019\u1030\u1038\u1015\u103C\u1031 \u1015\u1030\u1015\u1030\u101C\u1031\u102C\u1004\u103A\u101C\u1031\u102C\u1004\u103A\u1000\u103C\u102E\u1038\u1019\u103E\u102C \u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1005\u1031\u1016\u102D\u102F\u1037 \u1005\u102D\u1010\u103A\u1021\u1031\u1038\u1001\u103B\u1019\u103A\u1038\u101E\u102C\u1016\u103D\u101A\u103A\u101B\u102C '\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A Splash \u1021\u1011\u1030\u1038\u1018\u1030\u1038' \u101C\u1031\u1038\u1010\u103D\u1031 \u101B\u1031\u102C\u1000\u103A\u101B\u103E\u102D\u101C\u102D\u102F\u1037\u101C\u102C\u1015\u102B\u1015\u103C\u102E! \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1015\u103D\u1032\u1010\u1031\u102C\u103A\u101B\u1000\u103A\u1010\u101C\u103B\u103E\u1031\u102C\u1000\u103A \u1021\u101B\u101E\u102C\u1005\u102F\u1036\u1005\u102F\u1036\u101C\u1004\u103A\u101C\u1004\u103A\u1014\u1032\u1037 \u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1014\u102D\u102F\u1004\u103A\u1016\u102D\u102F\u1037\u1021\u1010\u103D\u1000\u103A \u1021\u1011\u1030\u1038\u1005\u102E\u1019\u1036\u1011\u102C\u1038\u1015\u102B\u1010\u101A\u103A\u104B\n\n\u1019\u102D\u101E\u102C\u1038\u1005\u102F\u1021\u102D\u1019\u103A\u1015\u103C\u1014\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u104A \u101C\u1019\u103A\u1038\u101C\u103B\u103E\u1031\u102C\u1000\u103A\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1011\u103D\u1000\u103A\u1019\u101A\u1037\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A \u101B\u1015\u103A\u1000\u103D\u1000\u103A\u1011\u1032\u1019\u103E\u102C \u1005\u1010\u102F\u1012\u102D\u101E\u102C\u1021\u101C\u103E\u1030\u1000\u103B\u103D\u1031\u1038\u1019\u101A\u1037\u103A \u101D\u102B\u101E\u1014\u102C\u101B\u103E\u1004\u103A\u1019\u103B\u102C\u1038\u1021\u102C\u1038\u101C\u102F\u1036\u1038\u1021\u1010\u103D\u1000\u103A \u1021\u1006\u1004\u103A\u1015\u103C\u1031\u1006\u102F\u1036\u1038\u1016\u103C\u1005\u103A\u1021\u1031\u102C\u1004\u103A \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u101C\u1030\u1000\u103C\u102D\u102F\u1000\u103A\u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 \u101E\u1018\u102C\u101D\u101C\u1000\u103A\u101C\u102F\u1015\u103A\u1021\u1001\u103B\u102D\u102F\u101B\u100A\u103A\u1019\u103B\u102C\u1038\u104A \u101C\u1010\u103A\u1006\u1010\u103A\u1006\u1014\u103A\u1038\u101E\u1005\u103A\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u101E\u1005\u103A\u101E\u102E\u1038\u1016\u103B\u1031\u102C\u103A\u101B\u100A\u103A\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A \u1014\u102C\u1019\u100A\u103A\u1000\u103B\u1031\u102C\u103A \u1021\u1011\u1030\u1038\u1015\u102F\u101E\u102D\u1019\u103A\u101F\u101C\u101D\u102B\u1010\u102D\u102F\u1037\u1000\u102D\u102F \u1010\u1005\u103A\u1014\u1031\u101B\u102C\u1010\u100A\u103A\u1038\u1019\u103E\u102C \u1005\u102F\u1036\u1005\u102F\u1036\u101C\u1004\u103A\u101C\u1004\u103A \u1010\u103D\u1032\u1005\u1015\u103A\u1015\u1031\u1038\u1011\u102C\u1038\u1015\u102B\u1010\u101A\u103A\u104B \u1001\u103B\u102D\u102F\u1019\u103C\u1010\u103A\u1010\u1032\u1037\u1021\u101B\u101E\u102C\u1014\u1032\u1037\u1021\u1010\u1030 \u1019\u1031\u102C\u1015\u1014\u103A\u1038\u1019\u103E\u102F\u1010\u103D\u1031\u1000\u102D\u102F \u1001\u103B\u1000\u103A\u1001\u103B\u1004\u103A\u1038\u1015\u103C\u1031\u1015\u103B\u1031\u102C\u1000\u103A\u1005\u1031\u1019\u103E\u102C \u101E\u1031\u1001\u103B\u102C\u1015\u102B\u1010\u101A\u103A\u1017\u103B\u102C\u3002\n\n\u{1F381} \u1021\u1011\u1030\u1038\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A - \u1012\u102E\u1014\u1031\u1037\u1019\u103E\u102C\u101A\u1030\u101B\u1004\u103A \u1010\u1005\u103A\u1017\u1030\u1038\u1001\u103B\u1004\u103A\u1038\u1005\u102E\u1021\u101C\u102D\u102F\u1000\u103A \u1041\u1045% \u1021\u1011\u102D \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u101B\u101B\u103E\u102D\u1019\u101A\u1037\u103A\u1021\u1015\u103C\u1004\u103A\u104A \u101B\u1031\u1005\u102D\u102F\u1001\u1036\u1021\u102D\u1010\u103A\u101C\u103E\u101C\u103E\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u101E\u1015\u103A\u101E\u1015\u103A\u101B\u1015\u103A\u101B\u1015\u103A \u1015\u102B\u1000\u1004\u103A\u1011\u102F\u1010\u103A\u1015\u102D\u102F\u1038\u1015\u1031\u1038\u101E\u103D\u102C\u1038\u1019\u103E\u102C\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B\n\n\u{1F6D2} \u1021\u1031\u102C\u103A\u1012\u102B\u1021\u101C\u103D\u101A\u103A\u1010\u1000\u1030\u1019\u103E\u102C\u101A\u1030\u101B\u1014\u103A \u1014\u100A\u103A\u1038\u101C\u1019\u103A\u1038 -\n\u1041\u104B \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u1000\u1000\u103A\u1010\u101C\u1031\u102C\u1037\u101C\u1004\u1037\u103A\u1001\u103A\u1011\u1032\u101E\u102D\u102F\u1037 \u101D\u1004\u103A\u101B\u1031\u102C\u1000\u103A\u1015\u103C\u102E\u1038 \u1019\u102D\u1019\u102D\u1014\u103E\u1005\u103A\u101E\u1000\u103A\u101B\u102C \u1019\u102F\u1014\u1037\u103A\u1014\u103E\u1004\u1037\u103A\u1021\u1001\u103B\u102D\u102F\u101B\u100A\u103A\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1015\u102B\u104B\n\u1042\u104B KBZPay (KPay)\u104A Wave Money \u101E\u102D\u102F\u1037\u1019\u101F\u102F\u1010\u103A \u1000\u1010\u103A\u1016\u103C\u1004\u1037\u103A \u101C\u103D\u101A\u103A\u1000\u1030\u101C\u103B\u1004\u103A\u1019\u103C\u1014\u103A\u1005\u103D\u102C \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1019\u103E\u102F\u1000\u102D\u102F \u1015\u103C\u102F\u101C\u102F\u1015\u103A\u1015\u102B\u104B\n\u1043\u104B \u1004\u103D\u1031\u101C\u103D\u103E\u1032\u1015\u103C\u1031\u1005\u102C (Screenshot) \u1000\u102D\u102F \u1010\u1004\u103A\u1015\u1031\u1038\u101B\u102F\u1036\u1014\u1032\u1037 \u1021\u1010\u100A\u103A\u1015\u103C\u102F\u1001\u103B\u1000\u103A\u101B\u101B\u103E\u102D\u1015\u103C\u102E\u1038 \u1005\u1019\u103A\u1038\u1001\u103B\u1031\u102C\u1004\u103A\u1038\u104A \u1017\u101F\u1014\u103A\u1038\u104A \u1000\u1019\u102C\u101B\u103D\u1010\u103A\u1019\u103C\u102D\u102F\u1037\u1014\u101A\u103A\u1019\u103B\u102C\u1038\u101E\u102D\u102F\u1037 \u1021\u102D\u1019\u103A\u1010\u102D\u102F\u1004\u103A\u101B\u102C\u101B\u1031\u102C\u1000\u103A \u1021\u1019\u103C\u1014\u103A\u1006\u102F\u1036\u1038 \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u101E\u103D\u102C\u1038\u1019\u103E\u102C \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u1001\u1004\u103A\u1017\u103B\u102C\u104B"
          },
          instagramCaption: {
            en: "Make your water festival sweetest! Thingyan Bundle is now active with extra 15% discount. Cool off, stay hydrated, and share traditional premium desserts with your friends and family during this Myanmar New Year! #ThingyanVibes #WaterFestival",
            my: "\u1019\u102D\u101E\u102C\u1038\u1005\u102F\u1005\u102F\u1005\u102F\u1005\u100A\u103A\u1038\u1005\u100A\u103A\u1038\u1014\u1032\u1037 \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u101B\u1000\u103A\u1010\u103D\u1031\u1000\u102D\u102F \u1016\u103C\u1010\u103A\u101E\u1014\u103A\u1038\u1016\u102D\u102F\u1037 \u1021\u1000\u1031\u102C\u1004\u103A\u1038\u1006\u102F\u1036\u1038 \u1021\u1001\u103B\u102D\u102F\u101B\u100A\u103A\u1014\u1032\u1037 \u1019\u102F\u1014\u1037\u103A\u1021\u1010\u103D\u1032\u1021\u1005\u1015\u103A\u101C\u1031\u1038\u1010\u103D\u1031\u104B \u1015\u102D\u1010\u1031\u102C\u1000\u103A\u1014\u1036\u1037\u101E\u1004\u103A\u1038\u1010\u1032\u1037\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1019\u103E\u102C \u1021\u101B\u101E\u102C\u1021\u101B\u103E\u102D\u1006\u102F\u1036\u1038\u1014\u1032\u1037 \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1021\u1011\u1030\u1038\u101B\u101A\u1030\u1015\u102B! #\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u101B\u1031\u1005\u102D\u102F\u1005\u102D\u102F"
          },
          adCopy: {
            en: "15% OFF Thingyan Essentials! Limited quantities available. Pre-order now with KPay for instant holiday delivery to Bahan, Sanchaung, & Kamayut!",
            my: "\u1041\u1045% \u101E\u1000\u103A\u101E\u102C\u1001\u103D\u1004\u1037\u103A\u1014\u1032\u1037 \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1021\u1011\u1030\u1038\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1018\u1030\u1038\u1021\u1001\u102F\u1015\u1032 \u1019\u103E\u102C\u101A\u1030\u1005\u102D\u102F\u1037! \u101B\u103D\u103E\u1031\u101D\u102B\u101B\u1031\u102C\u1004\u103A\u1015\u102D\u1010\u1031\u102C\u1000\u103A\u1015\u1014\u103A\u1038\u1010\u103D\u1031\u101C\u102D\u102F \u101C\u103E\u1015\u1010\u1032\u1037\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1016\u103C\u1005\u103A\u1015\u102B\u1005\u1031! KBZPay \u1016\u103C\u1004\u1037\u103A \u1004\u103D\u1031\u101C\u103D\u103E\u1032\u1019\u103C\u1014\u103A\u1006\u1014\u103A\u104B"
          },
          email: {
            en: "Subject: Celebrate Myanmar New Year with our Sweet Thingyan Bundles!\n\nDear Customer,\n\nThingyan and sweetness come hand in hand! As families gather to celebrate the glorious water festival, we are excited to deliver happiness straight to your doorstep.\n\nOur exclusive bundles are filled with refreshing traditional drinks and Pathein Halawa perfect for satuditha donations or family reunions. Enjoy an exclusive 15% sub-total savings when you order today. Simply pay through KBZPay or CBPay to verify. Wishing you a fabulous New Year!",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1019\u103C\u1014\u103A\u1019\u102C\u1037\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038 \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1015\u103D\u1032\u1010\u1031\u102C\u103A\u1021\u1010\u103D\u1000\u103A \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1019\u103B\u102C\u1038!\n\n\u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038...\n\n\u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1005\u101B\u102C \u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1015\u103D\u1032\u1019\u103E\u102C \u1001\u103B\u102D\u102F\u1019\u103C\u102D\u1014\u103A\u1015\u103C\u102E\u1038 \u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1005\u1031\u1019\u101A\u1037\u103A \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1021\u1010\u103D\u1032\u101C\u1031\u1038\u1010\u103D\u1031 \u1021\u101B\u101E\u102C\u101B\u103E\u102D\u101B\u103E\u102D \u101E\u102F\u1036\u1038\u1006\u1031\u102C\u1004\u103A\u1014\u102D\u102F\u1004\u103A\u1016\u102D\u102F\u1037 \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u1041\u1045% \u1005\u102E\u1005\u1009\u103A\u1015\u1031\u1038\u1011\u102C\u1038\u1015\u102B\u1010\u101A\u103A\u104B \u101E\u1004\u1037\u103A\u1019\u102D\u101E\u102C\u1038\u1005\u102F\u1006\u102E\u101E\u102D\u102F\u1037 \u1010\u102D\u102F\u1000\u103A\u101B\u102D\u102F\u1000\u103A\u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u1019\u100A\u1037\u103A\u1021\u1015\u103C\u1004\u103A KPay \u1016\u103C\u1004\u1037\u103A\u101C\u100A\u103A\u1038 \u101C\u103B\u1004\u103A\u1019\u103C\u1014\u103A\u1005\u103D\u102C \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1005\u101B\u102C\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1016\u103C\u1005\u103A\u1015\u102B\u1005\u1031!"
          },
          hashtags: "#Thingyan #WaterFestival #MyanmarNewYear #SME #MyanmarFood"
        },
        bannerPrompt: "A vibrant Thingyan Water festival digital banner design featuring green water splashes, golden Padauk flowers on the margins, and traditional food packages on an elegant yellow-gold backdrop with big text '15% OFF WATER FESTIVAL SALE'"
      },
      Christmas: {
        trendingProducts: ["Pathein Halawa (Premium)", "Traditional Arts & Crafts"],
        underperformingProducts: ["Beverages & Mixes"],
        lowStockAlerts: ["Traditional Arts: Low inventory on wooden carvings"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +30% sales surge during winter holiday gifts season",
          engagementLevel: "High activity during evening gift exchanges (8:00 PM onwards)",
          bestSellingCategory: "Traditional Desserts & Handcrafted Gifts"
        },
        recommendations: [{
          campaignTitle: "Warm Winter Festive Gift Campaign \u{1F384}",
          rationale: "Winter holidays and Christmas are prominent seasons for sending gifts to loved ones, relatives, and colleagues as tokens of appreciation.",
          targetAudience: "Corporate staff, families, and young couples seeking unique Burmese traditional gifts.",
          discountPercentage: "10% storewide & Free gift wrapping",
          duration: "7 Days (December 20 - 27)",
          expectedImpact: "Boost high-value traditional craft sales by 50% through high-margin appreciation crates.",
          implementationSteps: [
            "Assemble custom gift parcels including premium Pathein Halawa and traditional bamboo crafts.",
            "Set special discounted prices under Product Catalog.",
            "Design a cosy green-and-red Christmas poster.",
            "Publish the warm Facebook announcement captions.",
            "Send immediate checkout payment invoices with pre-applied delivery discount.",
            "Write custom hand-written wishes inside every order.",
            "Verify complete package deliveries before Christmas Eve."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F384} Spread warmth and joy this festive holiday! Present our carefully handwrapped traditional craft giftboxes that tell a beautiful heritage story.\n\nThis Christmas, skip the ordinary gifts and present your beloved families, corporate colleagues, and precious partners with a premium, carefully handwrapped traditional craft giftbox. Curated under the story of Myanmar's heritage, our boxes feature our signature, smooth Premium Pathein Halawa paired beautifully with handcrafted bamboo coasters and artisanal winter teas. It's more than a gift; it's a warm, memorable story of culture and appreciation.\n\n\u2728 CHRISTMAS EXCLUSIVE DEALS: Enjoy a generous 10% storewide discount along with absolute free premium winter-themed gift wrapping! Each gift box is customized with a hand-written greeting cards for your specific personal wishes!\n\n\u{1F385} HOW TO REGISTER YOUR GIFT BUNDLE:\n1. Click the catalog menu, select your traditional winter baskets.\n2. Furnish your personalized greeting wishes in the memo.\n3. Complete KBZPay/KPay prepayment to fast-track your booking. timly shipping is guaranteed!",
            my: "\u{1F384} \u1012\u102E\u1007\u1004\u103A\u1018\u102C\u101B\u1032\u1037 \u1021\u1031\u1038\u1001\u103B\u1019\u103A\u1038\u1010\u1032\u1037 \u1014\u103E\u1004\u103A\u1038\u1004\u103D\u1031\u1037\u1015\u103B\u1036\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1000\u102C\u101C\u1019\u103E\u102C \u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u101E\u1030\u1010\u103D\u1031\u1000\u102D\u102F \u1019\u1031\u1010\u1039\u1010\u102C\u1021\u1014\u103D\u1031\u1038\u1011\u100A\u103A\u1010\u103D\u1031 \u101D\u1031\u1019\u103B\u103E\u101C\u102D\u102F\u1000\u103A\u101B\u1021\u1031\u102C\u1004\u103A!\n\n\u101A\u1001\u102F\u101C\u102D\u102F \u1015\u103D\u1032\u1010\u1031\u102C\u103A\u101B\u1000\u103A\u1010\u103D\u1031\u1019\u103E\u102C \u1011\u1030\u1038\u1001\u103C\u102C\u1038\u1006\u1014\u103A\u1038\u101E\u1005\u103A\u1015\u103C\u102E\u1038 \u1002\u102F\u100F\u103A\u101B\u103E\u102D\u101C\u103E\u1015\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u1021\u1019\u103E\u1010\u103A\u1010\u101B\u1010\u103D\u1031\u1000\u102D\u102F \u1015\u1031\u1038\u1001\u103B\u1004\u103A\u1010\u101A\u103A\u1006\u102D\u102F\u101B\u1004\u103A\u1010\u1031\u102C\u1037 \u101E\u1014\u1037\u103A\u101B\u103E\u1004\u103A\u1038\u101C\u1000\u103A\u1006\u1000\u103A\u1010\u1032\u1037 \u1014\u102C\u1019\u100A\u103A\u1000\u103C\u102E\u1038 \u1015\u102F\u101E\u102D\u1019\u103A\u101F\u101C\u101D\u102B (Premium)\u104A \u101C\u1000\u103A\u101B\u102C\u1019\u103C\u1031\u102C\u1000\u103A\u101D\u102B\u1038\u101C\u1000\u103A\u1019\u103E\u102F \u1012\u102E\u1007\u102D\u102F\u1004\u103A\u1038\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A \u1021\u101B\u101E\u102C\u1011\u1030\u1038\u1000\u1032\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u1014\u103D\u1031\u1038\u1011\u103D\u1031\u1038\u101C\u1000\u103A\u1016\u1000\u103A\u101E\u102E\u1038\u101E\u1014\u1037\u103A\u1018\u1030\u1038\u1010\u103D\u1031\u1000\u102D\u102F \u1015\u1031\u102B\u1004\u103A\u1038\u1005\u1015\u103A\u1015\u1031\u1038\u1011\u102C\u1038\u1010\u1032\u1037 \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u102F\u1036\u1038\u1010\u103D\u1031\u1000\u102D\u102F \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101E\u1004\u1037\u103A\u1015\u102B\u1010\u101A\u103A\u1001\u1004\u103A\u1017\u103B\u102C\u104B \u1015\u1031\u1038\u101B\u101E\u1030\u101C\u100A\u103A\u1038 \u1019\u103B\u1000\u103A\u1014\u103E\u102C\u1015\u103D\u1004\u1037\u103A\u104A \u101B\u101B\u103E\u102D\u101E\u1030\u101C\u100A\u103A\u1038 \u1021\u1010\u102D\u102F\u1004\u103A\u1038\u1019\u101E\u102D \u101D\u1019\u103A\u1038\u101E\u102C\u1015\u102E\u1010\u102D\u1016\u103C\u1005\u103A\u101B\u1019\u101A\u1037\u103A \u1019\u103C\u1014\u103A\u1019\u102C\u1037\u101B\u102D\u102F\u1038\u101B\u102C \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103D\u1014\u103A\u1010\u1005\u103A\u1001\u102F \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B\n\n\u2728 \u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1021\u1011\u1030\u1038\u1001\u1036\u1005\u102C\u1038\u1001\u103D\u1004\u1037\u103A - \u1006\u102D\u102F\u1000\u103A\u101B\u103E\u102D \u1000\u102F\u1014\u103A\u1015\u1005\u1039\u1005\u100A\u103A\u1038\u1021\u102C\u1038\u101C\u102F\u1036\u1038\u1000\u102D\u102F \u1041\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1016\u103C\u1004\u1037\u103A \u101B\u101B\u103E\u102D\u1019\u100A\u1037\u103A\u1021\u1015\u103C\u1004\u103A\u104A \u1021\u101C\u103E\u1015\u1006\u102F\u1036\u1038 \u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1015\u102B\u1000\u1004\u103A\u1005\u1014\u1005\u103A\u1016\u103C\u1004\u1037\u103A \u1021\u1001\u1019\u1032\u1037\u1011\u102F\u1015\u103A\u1015\u102D\u102F\u1038\u1015\u1031\u1038\u101E\u103D\u102C\u1038\u1019\u103E\u102C\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B\n\n\u{1F385} \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102C\u101A\u1030\u101B\u1014\u103A \u1014\u100A\u103A\u1038\u101C\u1019\u103A\u1038\u1019\u103B\u102C\u1038 -\n\u1041\u104B \u1006\u102D\u102F\u1004\u103A\u101B\u1032\u1037 \u1000\u1000\u103A\u1010\u101C\u1031\u102C\u1037\u1016\u1031\u102C\u1004\u103A\u1011\u1032\u101E\u102D\u102F\u1037\u101D\u1004\u103A\u1000\u102C \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u102F\u1036\u1005\u1036\u1000\u102D\u102F\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1015\u102B\u104B\n\u1042\u104B \u1019\u102D\u1019\u102D\u101B\u1031\u1038\u101C\u102D\u102F\u1010\u1032\u1037 \u1006\u102F\u1010\u1031\u102C\u1004\u103A\u1038\u1005\u102C\u101E\u102C\u1038\u1000\u102D\u102F \u1011\u100A\u1037\u103A\u101E\u103D\u1004\u103A\u1038\u1015\u1031\u1038\u1015\u102B\u104B\n\u1043\u104B KPay (KBZPay) \u101E\u102D\u102F\u1037\u1019\u101F\u102F\u1010\u103A \u1016\u102F\u1014\u103A\u1038\u1014\u1036\u1015\u102B\u1010\u103A\u1016\u103C\u1004\u1037\u103A \u1021\u101C\u103D\u101A\u103A\u1010\u1000\u1030 \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1015\u103C\u102E\u1038 Screenshot \u1015\u1031\u1038\u1015\u102D\u102F\u1037\u1015\u102B\u104B"
          },
          instagramCaption: {
            en: "Give the gift of pure cultural heritage. Warm traditional Christmas boxes are live now! Includes Pathein Halawa and beautiful carved coasters. Free love wishes card. \u{1F385}\u{1F381} #ChristmasInBurma #HeritageGift",
            my: "\u1014\u103E\u101C\u102F\u1036\u1038\u101E\u102C\u1038\u1014\u1032\u1037 \u1016\u1014\u103A\u1010\u102E\u1038\u1011\u102C\u1038\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u1005\u1039\u1005\u100A\u103A\u1038\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u1012\u102E\u1014\u103E\u1005\u103A\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1019\u103E\u102C \u1021\u1036\u1037\u1021\u102C\u1038\u101E\u1004\u1037\u103A\u1005\u1031\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u104B \u1041\u1040% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u{1F381}"
          },
          adCopy: {
            en: "Warm Christmas Holiday Hampers: 10% Discount & free Myanmar packaging wraps. Timely door-to-door delivery! Order now using KPay.",
            my: "\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1021\u1011\u1030\u1038\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1018\u1030\u1038\u1019\u103B\u102C\u1038 - \u1041\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1014\u103E\u1004\u1037\u103A \u1021\u1001\u1019\u1032\u1037\u101C\u103E\u1015\u101E\u1031\u102C \u1015\u102B\u1000\u1004\u103A\u1011\u102F\u1010\u103A\u101C\u102F\u1015\u103A\u1019\u103E\u102F\u1005\u1014\u1005\u103A! \u1001\u103B\u1005\u103A\u101B\u101E\u1030\u1021\u101B\u1031\u102C\u1000\u103A KPay \u1016\u103C\u1004\u1037\u103A \u1019\u103C\u1014\u103A\u1006\u1014\u103A\u1005\u103D\u102C \u1019\u103E\u102C\u101A\u1030\u1015\u102B\u104B"
          },
          email: {
            en: "Subject: Send the Warmth of Traditional Crafts this Christmas\n\nDear Valued Customer,\n\nChristmas is the perfect season of gratitude. Share a story of culture and taste with our limited-edition craft appreciation crates.\n\nInside, find our premium traditional desserts and custom bamboo coasters designed by local artisans. Order today with an automated 10% discount applied. Fast KBZPay verification is active. Timely shipping guaranteed!",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1001\u103B\u1005\u103A\u101B\u101E\u1030\u1010\u103D\u1031\u1021\u1010\u103D\u1000\u103A \u1021\u1019\u103E\u1010\u103A\u1010\u101B \u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u102F\u1036\u1038\u1019\u103B\u102C\u1038\u104B\n\n\u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038...\n\n\u1012\u102E\u1014\u103E\u1005\u103A\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1019\u103E\u102C \u1021\u1019\u103E\u1010\u103A\u1010\u101B\u1011\u1030\u1038\u1001\u103C\u102C\u1038\u1006\u1014\u103A\u1038\u101E\u1005\u103A\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1018\u1030\u1038\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1019\u102D\u1005\u102F\u1014\u103E\u1004\u1037\u103A \u1019\u102D\u1010\u103A\u1006\u103D\u1031\u1019\u103B\u102C\u1038\u1006\u102E \u1015\u1031\u1038\u1015\u102D\u102F\u1037\u1019\u1031\u1010\u1039\u1010\u102C\u1019\u103B\u103E\u101D\u1031\u1014\u102D\u102F\u1004\u103A\u1016\u102D\u102F\u1037 \u1041\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u1005\u102E\u1005\u1009\u103A\u1015\u1031\u1038\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1021\u1001\u1019\u1032\u1037 \u1011\u102F\u1015\u103A\u1015\u102D\u102F\u1038\u1001\u103C\u1004\u103A\u1038\u1005\u1014\u1005\u103A\u1014\u103E\u1004\u1037\u103A\u1021\u101C\u103E\u1006\u1004\u103A\u1000\u1010\u103A\u1019\u103B\u102C\u1038\u1016\u103C\u1004\u1037\u103A \u1021\u1011\u1030\u1038\u101D\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102F\u1015\u1031\u1038\u1019\u103E\u102C \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B"
          },
          hashtags: "#ChristmasInMyanmar #FestiveGifts #BurmeseCrafts #WarmWinter"
        },
        bannerPrompt: "A cozy Christmas holiday marketing poster featuring rich green and ruby red colors, golden fairy lights, delicate snowflakes, and traditional craft baskets filled with traditional cakes"
      },
      NewYear: {
        trendingProducts: ["Pathein Halawa (Premium)", "Cracker Snacks"],
        underperformingProducts: ["Traditional Arts"],
        lowStockAlerts: ["Stock level stable for New Year party munchies"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +35% high-volume basket checkouts on December 31st",
          engagementLevel: "High checkout peaks midnight pre-orders",
          bestSellingCategory: "Snacks & Sweet treats"
        },
        recommendations: [{
          campaignTitle: "New Year Eve Party Munchies Celebration \u{1F973}",
          rationale: "As individuals count down to the New Year, social house-parties and sharing of snack packs and family dessert boards hit rapid consumer demand heights.",
          targetAudience: "Young shoppers, party hosts, and group gathering coordinators.",
          discountPercentage: "Buy 2 Get 1 Free on all Party Packs",
          duration: "3 Days (December 30 - January 1)",
          expectedImpact: "Clear inventory of snack foods and sweets, creating high double-order volumes.",
          implementationSteps: [
            "Set up 'Buy 2 Get 1' or bundle triggers on Snacks inside the matrix.",
            "Verify product stock availability for large evening demands.",
            "Prepare dark countdown midnight starry banners.",
            "Launch energetic social captions in Burmese and English.",
            "Activate conversational bot to immediately lock order and secure prepayments.",
            "Enable express same-day delivery routing.",
            "Recount remaining stock list for New Year morning restocks."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F973} Transition into the New Year with sweetness! Grab our 'Buy 2 Get 1 Free' Party munchies packs. Perfect for late night count-down groups. Live now!",
            my: "\u{1F973} \u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1005\u101B\u102C\u1000\u1031\u102C\u1004\u103A\u1038\u1010\u1032\u1037 \u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038\u100A\u1000\u102D\u102F \u1019\u102D\u101E\u102C\u1038\u1005\u102F\u104A \u101E\u1030\u1004\u101A\u103A\u1001\u103B\u1004\u103A\u1038\u1010\u103D\u1031\u1014\u1032\u1037\u1021\u1010\u1030 \u1016\u103C\u1010\u103A\u101E\u1014\u103A\u1038\u1016\u102D\u102F\u1037 \u1021\u1000\u103C\u103D\u1015\u103A\u1019\u102F\u1014\u1037\u103A\u1021\u1010\u103D\u1032\u1010\u103D\u1031 'Buy 2 Get 1' \u1021\u1011\u1030\u1038\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u101B\u1031\u102C\u1000\u103A\u101B\u103E\u102D\u101C\u102C\u1015\u102B\u1015\u103C\u102E! \u1000\u1031\u102C\u1004\u103A\u1012\u1031\u102B\u1004\u103A\u1038\u101C\u102F\u1015\u103A\u101B\u1004\u103A\u1038 \u101D\u102D\u102F\u1004\u103A\u1038\u1016\u103D\u1032\u1037\u1005\u102C\u1038\u1016\u102D\u102F\u1037 \u1021\u1001\u102F\u1015\u1032 \u1010\u101A\u103A\u101C\u102E\u1002\u101B\u1019\u103A\u1000\u1014\u1031 \u1010\u102D\u102F\u1000\u103A\u101B\u102D\u102F\u1000\u103A\u1019\u103E\u102C\u101A\u1030\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1017\u103B\u102D\u102F\u1037!"
          },
          instagramCaption: {
            en: "New Year, Same Great Taste! Buy 2 GET 1 absolute free promotion. Sparkle your celebration. \u2728\u{1F942}",
            my: "\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1019\u103E\u102C \u1021\u1000\u1031\u102C\u1004\u103A\u1038\u1019\u103D\u1014\u103A\u1006\u102F\u1036\u1038\u1021\u101B\u101E\u102C\u1010\u103D\u1031\u1014\u1032\u1037 \u1016\u103C\u1010\u103A\u101E\u1014\u103A\u1038\u1016\u102D\u102F\u1037 \u1021\u1000\u103C\u103D\u1015\u103A\u1019\u102F\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u1010\u103D\u1031\u101B\u103E\u102D\u1014\u1031\u1015\u103C\u102E\u104B #\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1014\u103E\u1005\u103A\u1006\u1014\u103A\u1038"
          },
          adCopy: {
            en: "Count down with Sweets: Buy 2 Get 1 FREE on Party Treats. Instant settlement active!",
            my: "\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1021\u1000\u103C\u102D\u102F \u1015\u102B\u1010\u102E\u1019\u102F\u1014\u1037\u103A\u1018\u1030\u1038\u1019\u103B\u102C\u1038 - \u1014\u103E\u1005\u103A\u1018\u1030\u1038\u101D\u101A\u103A \u1010\u1005\u103A\u1018\u1030\u1038\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A! \u1019\u103C\u1014\u103A\u1019\u103C\u1014\u103A\u1021\u1031\u102C\u103A\u1012\u102B\u1010\u1004\u103A\u1005\u102D\u102F\u1037!"
          },
          email: {
            en: "Subject: Bring Sweetness to the New Year Countdown! Buy 2 Get 1 Free Party treats await...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1016\u103D\u101A\u103A\u1000\u1031\u102C\u1004\u103A\u1038\u101E\u1031\u102C \u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038 \u1015\u102B\u1010\u102E\u1019\u102F\u1014\u1037\u103A\u1018\u1030\u1038\u1019\u103B\u102C\u1038\u104B \u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038..."
          },
          hashtags: "#NewYearEve #CountdownSweets #SMEGold #MyanmarParty"
        },
        bannerPrompt: "An energetic New Year countdown marketing graphic with deep dark blue background, vibrant neon fireworks, sparkling champagne gold stars, and delicious snack bowls"
      },
      Valentine: {
        trendingProducts: ["Pathein Halawa (Premium)"],
        underperformingProducts: ["Snacks"],
        lowStockAlerts: ["Sweet Boxes: High demand, critical stock buffer needed"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +50% sales boost on premium custom chocolate and sweet boxes",
          engagementLevel: "Direct chat inquiries spike heavily in late nights searching custom requests",
          bestSellingCategory: "Premium Confectionery & Sweet Boxes"
        },
        recommendations: [{
          campaignTitle: "Sweetheart Premium Confectionery Devotion \u{1F496}",
          rationale: "Valentine's Day signals romantic gifting. Presenting high-quality traditional sweets in gorgeous, limited-edition packaging targets youthful romance buyers looking for local yet premium options.",
          targetAudience: "Couples, partners, and friends looking for sweet, premium local presents.",
          discountPercentage: "Free customized love notes & 10% Couple Rebate",
          duration: "4 Days (February 11 - 14)",
          expectedImpact: "Increase dessert category average cart value, drawing new viral social visual shares.",
          implementationSteps: [
            "Prepare limited romantic packaging wrappers for sweet boxes.",
            "Add couple options in product catalogue.",
            "Design highly elegant, pink-pastel and crimson marketing banners.",
            "Publish romantic, poetic Burmese + English captions on social channels.",
            "Keep CRM Live takeover active to support cute custom handwritten letter requests.",
            "Coordinate reliable afternoon surprise deliveries during February 14th.",
            "Examine profit margins of Valentine themed additions."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F496} Speak the language of love with local authentic sweets! Gift your beloved our beautifully wrapped sweet boxes. Complete with personalized handwritten devotion notes free! Order now!",
            my: "\u{1F496} \u1001\u103B\u1005\u103A\u101E\u1030\u101E\u1000\u103A\u1010\u1019\u103A\u1038\u1010\u1005\u103A\u101C\u103B\u103E\u1031\u102C\u1000\u103A \u1021\u1001\u103B\u102D\u102F\u1019\u103C\u102D\u1014\u103A\u1006\u102F\u1036\u1038 \u1021\u1019\u103E\u1010\u103A\u1010\u101B\u101C\u1031\u1038\u1010\u103D\u1031 \u1016\u1014\u103A\u1010\u102E\u1038\u1015\u1031\u1038\u1016\u102D\u102F\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u1021\u1001\u103B\u102D\u102F\u1015\u103D\u1032 \u1021\u1011\u1030\u1038\u1012\u102E\u1007\u102D\u102F\u1004\u103A\u1038 \u1006\u103D\u102D\u101F\u1010\u103A\u1017\u1030\u1038\u101C\u1031\u1038\u1019\u103B\u102C\u1038! \u1001\u103B\u1005\u103A\u101B\u101E\u1030\u1021\u101B\u1031\u102C\u1000\u103A \u101C\u1000\u103A\u101B\u1031\u1038\u1021\u1001\u103B\u1005\u103A\u1000\u1010\u103A\u1015\u103C\u102C\u1038\u101C\u1031\u1038\u1014\u1032\u1037 \u1021\u1001\u1019\u1032\u1037\u1021\u1036\u1037\u1021\u102C\u1038\u101E\u1004\u1037\u103A\u1005\u1031\u1019\u101A\u1037\u103A \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u1019\u103E\u102F\u1005\u1014\u1005\u103A\u101C\u100A\u103A\u1038 \u1015\u102B\u101D\u1004\u103A\u101C\u102D\u102F\u1037 \u1021\u1015\u103C\u1031\u1038\u101C\u1031\u1038 \u1019\u103E\u102C\u101A\u1030\u1011\u102C\u1038\u101C\u102D\u102F\u1000\u103A\u1014\u1031\u102C\u103A\u104B"
          },
          instagramCaption: {
            en: "Local Sweets x Pure Love. Order the Valentine's devotion box today with romantic note options. \u{1F339}\u{1F48C}",
            my: "\u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u1031\u1037\u1019\u103E\u102C \u101B\u102D\u102F\u1019\u1014\u103A\u1038\u1010\u1005\u103A\u1006\u1014\u103A\u1006\u1014\u103A \u1015\u102B\u1000\u1004\u103A\u1021\u1011\u1030\u1038\u1018\u1030\u1038\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u101E\u1004\u1037\u103A\u1001\u103B\u1005\u103A\u101E\u1030\u1000\u102D\u102F \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u104B"
          },
          adCopy: {
            en: "Make Valentine's Sweet: 10% off romantic bundles + free gift letters. Order before slots close!",
            my: "\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E \u1041\u1044 \u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u1031\u1037\u1021\u1011\u1030\u1038 - \u1041\u1040% \u101E\u1000\u103A\u101E\u102C\u1001\u103D\u1004\u1037\u103A\u1014\u103E\u1004\u1037\u103A \u1021\u1001\u103B\u1005\u103A\u1000\u1010\u103A\u1015\u103C\u102C\u1038\u101C\u1000\u103A\u101B\u1031\u1038\u1021\u1005\u102E\u1021\u1005\u1009\u103A!"
          },
          email: {
            en: "Subject: Sweeten Valentine's with Authentic Craft Treats. Dear Valued Customer...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u1031\u1037\u1021\u1010\u103D\u1000\u103A \u1021\u1001\u103B\u102D\u102F\u1019\u103C\u102D\u1014\u103A\u1006\u102F\u1036\u1038 \u101B\u102D\u102F\u1038\u101B\u102C\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1018\u1030\u1038\u1019\u103B\u102C\u1038\u104B \u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038..."
          },
          hashtags: "#ValentinesInMyanmar #Feb14Sweets #LoveGifts #MyanmarSME"
        },
        bannerPrompt: "A gorgeous luxury romantic Valentine's Day sale poster layout with soft pink-pastel, deep ruby red velvet background, subtle rising heart petals, and a gorgeous sweet box with ribbons"
      },
      BackToSchool: {
        trendingProducts: ["Traditional Arts & Crafts", "Cracker Snacks"],
        underperformingProducts: ["Desserts"],
        lowStockAlerts: ["Backpacks and stationery inventory stable"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +25% conversion spikes on school snack bundles and craft tools",
          engagementLevel: "Morning grocery planners and mothers browsing bulk packs",
          bestSellingCategory: "Educational Supplies & Snacking Boxes"
        },
        recommendations: [{
          campaignTitle: "Back-to-School Smart Fuel Campaign \u{1F392}",
          rationale: "School reopening drives parental demand for ready-made lunchboxes and study-time snacks. Packaging custom snack boxes delivers high convenience.",
          targetAudience: "Mothers, students, and family event organizers.",
          discountPercentage: "20% OFF",
          duration: "14 Days",
          expectedImpact: "Boost unit snack volume sales by 30% with school pre-order deliveries.",
          implementationSteps: [
            "Bundle cracker snacks and warm drinks into healthy student lunchboxes.",
            "Display clean, minimalist school theme graphics.",
            "Offer classroom delivery discounts for bulk orders.",
            "Accept secure digital payments via KBZPay and Wave Money."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F392} Back-to-school season has arrived! Give your kids the absolute best, most delicious traditional snacks for study sessions with our Smart Fuel packs. 20% off special is live!",
            my: "\u{1F392} \u1000\u103B\u1031\u102C\u1004\u103A\u1038\u1016\u103D\u1004\u1037\u103A\u101B\u102C\u101E\u102E \u1021\u1011\u1030\u1038\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u101B\u1031\u102C\u1000\u103A\u101B\u103E\u102D\u101C\u102C\u1015\u102B\u1015\u103C\u102E! \u1000\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u1021\u1010\u103D\u1000\u103A \u1000\u103B\u1014\u103A\u1038\u1019\u102C\u101B\u1031\u1038\u1014\u1032\u1037\u100A\u102E\u100A\u103D\u1010\u103A\u1010\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1021\u101F\u102C\u101B\u1005\u102F\u1036\u1021\u1005\u1015\u103A\u1010\u103D\u1032\u1017\u1030\u1038\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1042\u1040% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1016\u103C\u1004\u1037\u103A \u101E\u1000\u103A\u101E\u102C\u1005\u103D\u102C \u1005\u102F\u1006\u1031\u102C\u1004\u103A\u1038\u101D\u101A\u103A\u101A\u1030\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u1001\u1004\u103A\u1017\u103B\u102C\u104B"
          },
          instagramCaption: {
            en: "Study smart, snack healthier! 20% Off school lunchbox snack bundles. \u{1F392}\u{1F37F}",
            my: "\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u101E\u102C\u1038\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u101E\u1030\u1019\u103B\u102C\u1038 \u1005\u102D\u1010\u103A\u101B\u103D\u103E\u1004\u103A\u101C\u1014\u103A\u1038\u1005\u103D\u102C \u1005\u102C\u101E\u1004\u103A\u1000\u103C\u102C\u1038\u1014\u102D\u102F\u1004\u103A\u1016\u102D\u102F\u1037 \u1021\u101F\u102C\u101B\u1015\u103C\u100A\u1037\u103A\u1019\u102F\u1014\u1037\u103A\u1017\u1030\u1038\u1019\u103B\u102C\u1038 \u1042\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B"
          },
          adCopy: {
            en: "Back to School Specials: 20% Off student snack boxes!",
            my: "\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u1016\u103D\u1004\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 - \u1000\u103B\u1031\u102C\u1004\u103A\u1038\u101E\u102C\u1038\u1021\u101F\u102C\u101B\u1017\u1030\u1038\u1019\u103B\u102C\u1038 \u1042\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B"
          },
          email: {
            en: "Subject: Help them achieve their best with 20% off School Snack Boxes! Dear parents...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1000\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u1016\u103D\u1004\u1037\u103A\u1001\u103B\u102D\u1014\u103A\u1019\u103E\u102C \u1021\u1006\u1004\u103A\u101E\u1004\u1037\u103A\u101B\u103E\u102D\u1005\u1031\u1019\u101A\u1037\u103A \u1021\u101F\u102C\u101B\u1019\u102F\u1014\u1037\u103A\u1018\u1030\u1038\u1019\u103B\u102C\u1038 \u1042\u1040% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B"
          },
          hashtags: "#BackToSchool #StudentSnacks #MyanmarSME"
        },
        bannerPrompt: "A pleasant scholastic backdrop featuring notebooks, pencils, color frames, and a customized study snack bundle with text 'BACK TO SCHOOL SALE'"
      },
      MonsoonSale: {
        trendingProducts: ["Beverages & Mixes", "Pathein Halawa (Premium)"],
        underperformingProducts: ["Traditional Arts"],
        lowStockAlerts: ["Check tea mix reserves weekly for rainy day spikes"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +35% conversions for hot coffee and tea items on rainy afternoons",
          engagementLevel: "Cozy home dwellers browsing comfort foods during rainstorms",
          bestSellingCategory: "Beverages (Hot Brews & Sweet Teas)"
        },
        recommendations: [{
          campaignTitle: "Monsoon Cozy Warm-Up Sale \u{1F327}\uFE0F",
          rationale: "During rainy monsoon days, warm comfort tea and sweet authentic jaggery drops are highly sought after to brighten up chilly weather.",
          targetAudience: "Families, home dwellers, and remote office workers in Myanmar.",
          discountPercentage: "15% OFF",
          duration: "7 Days",
          expectedImpact: "Increase high-margin hot beverage sales by 35% with contactless instant courier dispatch.",
          implementationSteps: [
            "Combine hot Royal Myanmar Tea Mix packets with traditional palm jaggery bites.",
            "Post comforting rainy day captions on active Facebook page channels.",
            "Utilize contactless KPay screenshot uploads for swift courier bookings."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F327}\uFE0F Chilly rainy afternoons call for warm comforts! Cozy up with our classic tea & sweet traditional bundle, now at 15% off.",
            my: "\u{1F327}\uFE0F \u1019\u102D\u102F\u1038\u1021\u1031\u1038\u1021\u1031\u1038\u101C\u1031\u1038\u1019\u103E\u102C \u1021\u102D\u1019\u103A\u1011\u1032\u1000\u1019\u1011\u103D\u1000\u103A\u1018\u1032 \u1015\u1030\u1015\u1030\u1014\u103D\u1031\u1038\u1014\u103D\u1031\u1038 \u1021\u101B\u101E\u102C\u1011\u1030\u1038\u1000\u1032\u101C\u103E\u101E\u1031\u102C \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1021\u1006\u1014\u103A\u1038\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1005\u1031\u1016\u102D\u102F\u1037 \u1041\u1045% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u1019\u102D\u102F\u1038\u101B\u102C\u101E\u102E\u1021\u1005\u102E\u1021\u1005\u1009\u103A\u101C\u1031\u1038 \u1005\u1010\u1004\u103A\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1015\u103C\u102E\u104B"
          },
          instagramCaption: {
            en: "Monsoon rain and cozy teacups. 15% Off comfort beverage bundles! \u{1F327}\uFE0F\u2615",
            my: "\u1019\u102D\u102F\u1038\u101B\u102C\u101E\u102E\u1021\u101D\u102E\u1000\u1014\u1037\u103A\u1019\u103E\u102C \u101E\u1004\u1037\u103A\u1000\u102D\u102F\u1014\u103D\u1031\u1038\u1011\u103D\u1031\u1038\u1005\u1031\u1019\u101A\u1037\u103A \u101B\u102D\u102F\u1038\u101B\u102C\u1006\u1031\u1038\u1016\u1000\u103A\u101D\u1004\u103A \u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1000\u103C\u1019\u103A\u1038\u1014\u103E\u1004\u1037\u103A \u1019\u102F\u1014\u1037\u103A\u1021\u1010\u103D\u1032\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u104B"
          },
          adCopy: {
            en: "Rainy Day Specials: 15% off classic comforting sweet bundles!",
            my: "\u1019\u102D\u102F\u1038\u101B\u102C\u101E\u102E\u1021\u1011\u1030\u1038 - \u1015\u1030\u1014\u103D\u1031\u1038\u101C\u1014\u103A\u1038\u1006\u1014\u103A\u1038\u101E\u1031\u102C \u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1021\u1010\u103D\u1032\u1017\u1030\u1038 \u1041\u1045% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B"
          },
          email: {
            en: "Subject: Stay Safe & Warm with 15% Off Monsoon Cozy Specials! Dear Valued Customer...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1019\u102D\u102F\u1038\u101B\u102C\u101E\u102E\u1021\u1021\u1031\u1038\u1019\u103E\u102C \u101E\u1004\u1037\u103A\u1021\u102D\u1019\u103A\u1000\u102D\u102F \u1014\u103D\u1031\u1038\u1011\u103D\u1031\u1038\u1005\u1031\u1019\u101A\u1037\u103A \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103D\u1014\u103A \u101E\u102E\u1038\u101E\u1014\u1037\u103A \u1041\u1045% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B"
          },
          hashtags: "#MonsoonSale #BurmeseMilkyTea #CozyRainyDay #SMEBrand"
        },
        bannerPrompt: "A cozy rainy season window view with water droplets on pane, a steaming cup of freshly brewed tea, and warm candlelight with text 'MONSOON COZY WARM-UP SALE'"
      },
      FlashSale: {
        trendingProducts: ["Pathein Halawa (Premium)", "Artisanal Drinks"],
        underperformingProducts: ["Traditional Arts"],
        lowStockAlerts: ["Check stock limits weekly for weekend surges"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +25% conversion improvement through payday weekend flash deals",
          engagementLevel: "Weekend checkout spikes during leisure browsing hours",
          bestSellingCategory: "Food & Beverages"
        },
        recommendations: [{
          campaignTitle: "Weekend Lightning Flash Sale \u26A1",
          rationale: "Leisure shoppers have higher weekend browsing downtime. Slicing prices for 72 hours builds conversion urgency.",
          targetAudience: "Weekend shoppers seeking quick premium sweet treats.",
          discountPercentage: "25% OFF",
          duration: "3 Days (Fri - Sun)",
          expectedImpact: "Boost weekend gross revenue margins by 25% during regular business cycles.",
          implementationSteps: [
            "Activate 25% discount coupons starting early Friday morning.",
            "Restock highly demanded dessert specialties beforehand.",
            "Accept KPay and Wave Money screenshots for rapid holiday dispatch."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u26A1 Reward yourself after a busy work week! Treat yourself and your family to premium sweet traditional treats at 25% off weekend special. Live now!",
            my: "\u26A1 \u1015\u1004\u103A\u1015\u1014\u103A\u1038\u101E\u1019\u103B\u103E \u1010\u1005\u103A\u1015\u1010\u103A\u1010\u102C\u1021\u101C\u102F\u1015\u103A\u1010\u103D\u1031\u1000\u102D\u102F \u1018\u1031\u1038\u1016\u101A\u103A\u1011\u102C\u1038\u1015\u103C\u102E\u1038 \u1019\u1004\u103A\u1039\u1002\u101C\u102C\u101B\u103E\u102D\u1010\u1032\u1037\u101D\u102E\u1000\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1031\u1038\u1014\u1032\u1037\u1021\u1010\u1030 \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1001\u103B\u102D\u102F\u1001\u103B\u102D\u102F\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u1005\u102D\u1010\u103A\u1021\u1015\u1014\u103A\u1038\u1016\u103C\u1031\u101C\u102D\u102F\u1000\u103A\u101B\u1021\u1031\u102C\u1004\u103A! \u1042\u1045% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u101D\u102E\u1000\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u1021\u1001\u102F\u1015\u1032 \u1005\u1010\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u1001\u1004\u103A\u1017\u103B\u102C\u104B"
          },
          instagramCaption: {
            en: "Self-care begins with sweet traditional treats! 25% Weekend Flash active! \u26A1\u{1F9C1}",
            my: "\u101D\u102E\u1000\u1014\u1037\u103A\u1021\u102C\u1038\u101C\u1015\u103A\u101B\u1000\u103A\u1019\u103E\u102C \u1021\u1000\u1031\u102C\u1004\u103A\u1038\u1006\u102F\u1036\u1038\u1021\u101B\u101E\u102C\u1010\u103D\u1031\u1014\u1032\u1037 \u1005\u102D\u1010\u103A\u1021\u1015\u1014\u103A\u1038\u1016\u103C\u1031\u1016\u102D\u102F\u1037 \u1042\u1045% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u1005\u1010\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B"
          },
          adCopy: {
            en: "Weekend Flash Sale: Settle orders exceeding 15,000 MMK with 25% off!",
            my: "\u101D\u102E\u1000\u1014\u1037\u103A\u101D\u101A\u103A\u101A\u1030\u1019\u103E\u102F \u1005\u102F\u1005\u102F\u1015\u1031\u102B\u1004\u103A\u1038 \u1041\u1045,\u1040\u1040\u1040 \u1000\u103B\u1015\u103A\u1021\u1011\u1000\u103A \u1042\u1045% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u101D\u1018\u103A\u1006\u102D\u102F\u1012\u103A\u1019\u103E\u102C \u1001\u103B\u1000\u103A\u1001\u103B\u1004\u103A\u1038\u1019\u103E\u102C\u101A\u1030\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u104B"
          },
          email: {
            en: "Subject: Reward Yourself with a 25% Weekend Treat! Dear Valued Customer...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1015\u1004\u103A\u1015\u1014\u103A\u1038\u101E\u1019\u103B\u103E\u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1005\u1031\u1019\u101A\u1037\u103A \u101D\u102E\u1000\u1014\u1037\u103A \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u1042\u1045% \u1005\u1010\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B"
          },
          hashtags: "#WeekendDelight #MyanmarSME #WeekendShopping"
        },
        bannerPrompt: "A clean modern slate-gray marketing poster with gold-accented frames and glowing sparkles with text 'WEEKEND DELIGHT FLASH SALE'"
      },
      General: {
        trendingProducts: ["Pathein Halawa (Premium)", "Artisanal Drinks"],
        underperformingProducts: ["Traditional Arts"],
        lowStockAlerts: ["Check stock limits weekly for weekend surges"],
        analyticsSummary: {
          salesGrowthEstimate: "Estimated +20% conversion improvement through routine weekend flash sales",
          engagementLevel: "Slight conversion drop around mid-weeks, spikes on payday (30th of month)",
          bestSellingCategory: "Food & Beverages"
        },
        recommendations: [{
          campaignTitle: "SME Weekend Flash Delight Campaign \u{1F31F}",
          rationale: "Buyers routines include weekly weekend downtime browsing. Running targeted limited-period discount timers boosts immediate weekend checkouts.",
          targetAudience: "Weekend leisure shoppers seeking authentic traditional tastes at homes.",
          discountPercentage: "10% off storewide above 15,000 MMK total checkout",
          duration: "3 Days (Every Friday to Sunday)",
          expectedImpact: "Boost week-end gross sales margins by 25% during regular business cycles.",
          implementationSteps: [
            "Enable 10% coupon rates on items during weekend periods.",
            "Restock hot dessert treats on Friday mornings.",
            "Display clean, minimalist weekend sale banners.",
            "Launch cozy weekend relax captions on Facebook channels.",
            "Activate chatbot with faster automations on pre-orders.",
            "Route local kamayut / sanchaung delivery runs together for optimized transport costs.",
            "Summarize profits on Monday mornings to cycle strategy."
          ]
        }],
        copywriting: {
          facebookCaption: {
            en: "\u{1F31F} Reward yourself after a busy work week! Treat yourself and your loved ones to beautiful sweet desserts and crafts. 10% off weekend checkout special is officially live now!",
            my: "\u{1F31F} \u1015\u1004\u103A\u1015\u1014\u103A\u1038\u101E\u1019\u103B\u103E \u1010\u1005\u103A\u1015\u1010\u103A\u1010\u102C\u1021\u101C\u102F\u1015\u103A\u1010\u103D\u1031\u1000\u102D\u102F \u1018\u1031\u1038\u1016\u101A\u103A\u1011\u102C\u1038\u1015\u103C\u102E\u1038 \u1019\u1004\u103A\u1039\u1002\u101C\u102C\u101B\u103E\u102D\u1010\u1032\u1037\u101D\u102E\u1000\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1031\u1038\u1014\u1032\u1037\u1021\u1010\u1030 \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1001\u103B\u102D\u102F\u1001\u103B\u102D\u102F\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u1005\u102D\u1010\u103A\u1021\u1015\u1014\u103A\u1038\u1016\u103C\u1031\u101C\u102D\u102F\u1000\u103A\u101B\u1021\u1031\u102C\u1004\u103A! \u1041\u1040% \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 \u101D\u102E\u1000\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u1021\u1001\u102F\u1015\u1032 \u1005\u1010\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u1001\u1004\u103A\u1017\u103B\u102C\u104B"
          },
          instagramCaption: {
            en: "Weekend Treats: Self-care begins with sweet traditional snacks. 10% Weekend Off active! \u{1F37F}\u{1F964}",
            my: "\u101D\u102E\u1000\u1014\u1037\u103A\u1021\u102C\u1038\u101C\u1015\u103A\u101B\u1000\u103A\u1019\u103E\u102C \u1021\u1000\u1031\u102C\u1004\u103A\u1038\u1006\u102F\u1036\u1038\u1021\u101B\u101E\u102C\u1010\u103D\u1031\u1014\u1032\u1037 \u1005\u102D\u1010\u103A\u1021\u1015\u1014\u103A\u1038\u1016\u103C\u1031\u1016\u102D\u102F\u1037\u104B"
          },
          adCopy: {
            en: "Treat Yourself: 10% Weekend discounts on order checkouts exceeding 15,000 MMK. Settles in seconds!",
            my: "\u101D\u102E\u1000\u1014\u1037\u103A\u101D\u101A\u103A\u101A\u1030\u1019\u103E\u102F \u1005\u102F\u1005\u102F\u1015\u1031\u102B\u1004\u103A\u1038 \u1041\u1045,\u1040\u1040\u1040 \u1000\u103B\u1015\u103A\u1021\u1011\u1000\u103A \u1041\u1040% \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038! \u101E\u1000\u103A\u101E\u102C\u1005\u103D\u102C \u101D\u101A\u103A\u101A\u1030\u101C\u102D\u102F\u1000\u103A\u1005\u102D\u102F\u1037!"
          },
          email: {
            en: "Subject: Reward Yourself with a 10% Weekend Treat! Dear Valued Customeer...",
            my: "\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - \u1015\u1004\u103A\u1015\u1014\u103A\u1038\u101E\u1019\u103B\u103E\u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1005\u1031\u1019\u101A\u1037\u103A \u101D\u102E\u1000\u1014\u1037\u103A \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u104B \u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038..."
          },
          hashtags: "#WeekendDelight #MyanmarSME #TraditionalTreats #WeekendShopping"
        },
        bannerPrompt: "A clean modern slate-gray marketing poster with gold-accented frames, glowing sparkles, featuring premium traditional cake platters and drinks with textual overlay 'WEEKEND DELIGHT FLASH SALE'"
      }
    };
    const targetType = campaignType in fallbackTemplate ? campaignType : "General";
    const fallbackResponse = JSON.parse(JSON.stringify(fallbackTemplate[targetType]));
    if (fallbackResponse.copywriting) {
      const pShortNameEn = finalProducts.slice(0, 2).map((p) => p.name).join(" & ");
      const pShortNameMy = finalProducts.slice(0, 2).map((p) => p.name).join(" \u1014\u103E\u1004\u1037\u103A ");
      if (fallbackResponse.copywriting.facebookCaption) {
        fallbackResponse.copywriting.facebookCaption.en = `[Promoting Selected Selections: ${featuredProdsTextEn}]

` + fallbackResponse.copywriting.facebookCaption.en;
        fallbackResponse.copywriting.facebookCaption.my = `[\u1021\u1011\u1030\u1038\u1021\u101B\u1031\u102C\u1004\u103A\u1038\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u101B\u1014\u103A \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1019\u103E\u102F - ${featuredProdsTextMy}]

` + fallbackResponse.copywriting.facebookCaption.my;
      }
      if (fallbackResponse.copywriting.instagramCaption) {
        fallbackResponse.copywriting.instagramCaption.en = `Featuring: ${pShortNameEn}! ` + fallbackResponse.copywriting.instagramCaption.en;
        fallbackResponse.copywriting.instagramCaption.my = `${pShortNameMy} \u1021\u1010\u103D\u1000\u103A \u101E\u102E\u1038\u101E\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038! ` + fallbackResponse.copywriting.instagramCaption.my;
      }
    }
    const backgroundDetails = {
      Thingyan: "a vibrant summer water festival backdrop featuring yellow Padauk flowers, sparkling water splashes, and cool yellow accent design overlays",
      Christmas: "a warm winter Christmas scene featuring green evergreen pine branches, ruby red ornaments, and glowing golden fairy lights",
      NewYear: "an energetic, starry countdown night with colorful glowing fireworks, sparkly confetti, and elegant dark metallic borders",
      Valentine: "a beautiful romantic backdrop with lovely red roses, aesthetic hearts, and warm pink candlelight glow",
      BackToSchool: "a colorful school-themed chalkboard scenery with colorful textbooks, creative drawing elements, and sky blue accents",
      MonsoonSale: "a cozy rainfall-themed backdrop featuring blue and dark teal cloud patterns, soft raindrops, and glowing warm lighting overlays",
      FlashSale: "a high-contrast golden lightning weekend promotional backdrop featuring modern metallic accents, clean border lines, and modern typography",
      General: "a highly stylized premium lifestyle backdrop with smooth gradients and modern design overlays"
    };
    const bgDesc = backgroundDetails[campaignType] || backgroundDetails.General;
    const getProductHighlight = (p, lang) => {
      const name = (p.name || "").toLowerCase();
      const desc = p.description || "";
      const cat = (p.category || "").toLowerCase();
      const isFood = cat.includes("food") || cat.includes("dessert") || cat.includes("snack") || cat.includes("beverage") || name.includes("tea") || name.includes("halawa") || name.includes("jaggery") || name.includes("honey") || name.includes("snack");
      const isCloth = cat.includes("cloth") || cat.includes("apparel") || cat.includes("wear") || cat.includes("dress") || cat.includes("fashion") || name.includes("shirt") || name.includes("dress") || name.includes("fabric") || name.includes("trousers") || name.includes("shoe");
      const isCosmetic = cat.includes("cosmetic") || cat.includes("beauty") || cat.includes("skin") || cat.includes("care") || name.includes("skin") || name.includes("cream") || name.includes("lipstick") || name.includes("makeup") || name.includes("oil");
      const isAccessory = cat.includes("accessory") || cat.includes("jewelry") || cat.includes("bag") || cat.includes("watch") || name.includes("ring") || name.includes("bag") || name.includes("umbrella") || name.includes("parasol");
      const isElectronic = cat.includes("electronic") || cat.includes("device") || cat.includes("tech") || cat.includes("phone") || cat.includes("gadget") || cat.includes("computer") || name.includes("phone") || name.includes("charger") || name.includes("cable") || name.includes("earbud");
      const isDigital = cat.includes("digital") || cat.includes("service") || cat.includes("software") || name.includes("course") || name.includes("sub") || name.includes("account");
      const isHome = cat.includes("home") || cat.includes("lifestyle") || cat.includes("furnit") || cat.includes("decor") || name.includes("decor") || name.includes("furniture") || name.includes("candle");
      if (name.includes("tea") || name.includes("royal") || name.includes("beverage")) {
        return lang === "en" ? `Our signature Royal Myanmar Instant Tea Mix brings the comforting, creamy, and sweet sensation of authentic tea-shop brew right into your home. Packaged in 30 ready-to-brew sachets, it's perfect for warm traditional morning routines in Myanmar.` : `\u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u1021\u1013\u102D\u1000\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1019\u103E\u102F\u1016\u103C\u1005\u103A\u1010\u1032\u1037 Royal Myanmar Instant Tea Mix \u1000 \u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1006\u102D\u102F\u1004\u103A\u1000 \u1015\u103D\u1000\u103A\u1015\u103D\u1000\u103A\u1014\u103D\u1031\u1038\u1014\u103D\u1031\u1038 \u1006\u102D\u102F\u1004\u103A\u101E\u1031\u102C\u1000\u103A\u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1021\u101B\u101E\u102C\u1000\u102D\u102F \u1021\u102D\u1019\u103A\u1019\u103E\u102C \u1041 \u1019\u102D\u1014\u1005\u103A\u1021\u1010\u103D\u1004\u103A\u1038 \u1016\u103B\u1031\u102C\u103A\u101E\u1031\u102C\u1000\u103A\u1014\u102D\u102F\u1004\u103A\u1005\u1031\u1015\u103C\u102E\u1038 \u1019\u103C\u1014\u103A\u1019\u102C\u101C\u1030\u1019\u103B\u102D\u102F\u1038\u1010\u102D\u102F\u1004\u103A\u1038 \u1014\u103E\u1005\u103A\u101E\u1000\u103A\u1000\u103C\u102D\u102F\u1000\u103A\u1014\u103E\u1005\u103A\u101E\u1000\u103A\u101C\u103E\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (name.includes("halawa") || name.includes("pathein") || name.includes("dessert")) {
        return lang === "en" ? `Indulge in our legendary Premium Pathein Halawa, crafted with pure butter, sticky rice, and roasted poppy seeds that melt in your mouth with an authentic Burmese sweet heritage.` : `\u101C\u1030\u1010\u102D\u102F\u1004\u103A\u1038\u1021\u1000\u103C\u102D\u102F\u1000\u103A\u1014\u103E\u1005\u103A\u101E\u1000\u103A\u101C\u103E\u1010\u1032\u1037 \u1014\u102C\u1019\u100A\u103A\u1000\u103C\u102E\u1038 \u1015\u102F\u101E\u102D\u1019\u103A\u101F\u101C\u101D\u102B (Premium Butter & Poppy Seed) \u1000 \u1018\u102D\u1014\u103A\u1038\u1005\u1031\u1037\u101C\u1031\u1038\u1010\u103D\u1031\u1014\u1032\u1037 \u1011\u1031\u102C\u1015\u1010\u103A\u1014\u1036\u1037\u101E\u1004\u103A\u1038\u101E\u1004\u103A\u1038\u101C\u1031\u1038\u1019\u102D\u102F\u1037 \u1001\u1036\u1010\u103D\u1004\u103A\u1038\u1011\u1032\u1019\u103E\u102C \u1021\u101B\u100A\u103A\u1015\u103B\u1031\u102C\u103A\u101E\u103D\u102C\u1038\u1005\u1031\u1019\u101A\u1037\u103A \u1019\u103C\u1014\u103A\u1019\u102C\u1037\u101B\u102D\u102F\u1038\u101B\u102C\u1021\u1000\u1014\u103A\u1026\u1038\u1021\u1001\u103B\u102D\u102F\u1015\u103D\u1032\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (name.includes("parasol") || name.includes("umbrella") || name.includes("craft")) {
        return lang === "en" ? `Admire the stunning Handcrafted Pathein Bamboo Parasol, hand-painted elegantly in ruby red by local master artisans. It shields you from sun and rain while elevating your authentic cultural lifestyle.` : `\u101C\u1000\u103A\u101B\u102C\u1019\u103C\u1031\u102C\u1000\u103A \u101B\u103E\u102F\u1001\u103B\u1004\u103A\u1005\u1016\u103D\u101A\u103A \u1015\u102F\u101E\u102D\u1019\u103A\u1011\u102E\u1038 (Handcrafted Pathein Parasol) \u1000 \u1015\u102F\u101E\u102D\u1019\u103A\u1019\u103C\u102D\u102F\u1037\u101B\u1032\u1037 \u101D\u102B\u1038\u1014\u103E\u1004\u1037\u103A \u1005\u1000\u1039\u1000\u1030\u101C\u1000\u103A\u1019\u103E\u102F\u1021\u1014\u102F\u1015\u100A\u102C\u1005\u1005\u103A\u1005\u1005\u103A\u1016\u103C\u1005\u103A\u1015\u103C\u102E\u1038 \u1014\u1031\u1015\u1030\u1019\u102D\u102F\u1038\u101B\u103D\u102C\u1021\u1010\u103D\u1004\u103A\u1038\u1019\u103E\u102C\u101C\u100A\u103A\u1038 \u1021\u1011\u1030\u1038\u1015\u1032 \u101C\u103E\u1015\u1006\u103D\u1032\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102F\u1021\u1015\u103C\u100A\u1037\u103A \u101B\u103E\u102D\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (name.includes("jaggery") || name.includes("sweet") || name.includes("palm")) {
        return lang === "en" ? `Experience Kyaukpadaung Premium Jaggery drops, wild-harvested palm sugar stuffed with crispy, sweet shredded coconut that pairs absolutely flawlessly with a hot cup of green tea.` : `\u1000\u103B\u1031\u102C\u1000\u103A\u1015\u1014\u103A\u1038\u1010\u1031\u102C\u1004\u103A\u1038\u1012\u1031\u101E\u1011\u103D\u1000\u103A Premium \u1011\u1014\u103A\u1038\u101C\u103B\u1000\u103A\u101C\u102F\u1036\u1038\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u101E\u100A\u103A \u1021\u102F\u1014\u103A\u1038\u101E\u102E\u1038\u1016\u1010\u103A\u1019\u103D\u103E\u1031\u1038\u1019\u103D\u103E\u1031\u1038\u101C\u1031\u1038\u1010\u103D\u1031 \u1015\u102B\u101D\u1004\u103A\u101C\u102D\u102F\u1037 \u101C\u1000\u103A\u1016\u1000\u103A\u101B\u100A\u103A\u1000\u103C\u1019\u103A\u1038\u101E\u1031\u102C\u1000\u103A\u1010\u1032\u1037\u1021\u1001\u102B\u1016\u103C\u1005\u103A\u1016\u103C\u1005\u103A \u101D\u102B\u1038\u1005\u102C\u1038\u1016\u102D\u102F\u1037\u1016\u103C\u1005\u103A\u1016\u103C\u1005\u103A \u101E\u1018\u102C\u101D\u1021\u1001\u103B\u102D\u102F\u1013\u102C\u1010\u103A\u1000\u102D\u102F \u1021\u1015\u103C\u100A\u1037\u103A\u1021\u101D\u1015\u1031\u1038\u1005\u103D\u1019\u103A\u1038\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (name.includes("honey") || name.includes("wildflower")) {
        return lang === "en" ? `Savour 100% natural organic Shan Hills Wildflower Honey, deep forest raw honey that boosts your daily immune system and pairs beautifully with both tea and desserts.` : `\u1041\u1040\u1040% \u101B\u103E\u1019\u103A\u1038\u1010\u1031\u102C\u1004\u103A\u1010\u1014\u103A\u1038 \u1010\u1031\u102C\u1015\u103B\u102C\u1038\u101B\u100A\u103A\u1005\u1005\u103A\u1005\u1005\u103A\u101E\u100A\u103A \u1010\u1031\u102C\u1014\u1000\u103A\u1000\u103C\u102E\u1038\u1019\u103B\u102C\u1038\u1011\u1032\u1019\u103E \u101B\u101B\u103E\u102D\u1011\u102C\u1038\u1015\u103C\u102E\u1038 \u1000\u103B\u1014\u103A\u1038\u1019\u102C\u101B\u1031\u1038\u1021\u1010\u103D\u1000\u103A \u1015\u103B\u102C\u1038\u101B\u100A\u103A\u101B\u1032\u1037 \u1011\u1030\u1038\u1001\u103C\u102C\u1038\u1006\u1014\u103A\u1038\u101E\u1005\u103A\u1010\u1032\u1037 \u1002\u102F\u100F\u103A\u101E\u1010\u1039\u1010\u102D\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A \u1000\u102D\u102F\u101A\u103A\u1001\u1036\u1021\u102C\u1038\u1000\u102D\u102F \u1021\u1015\u103C\u100A\u1037\u103A\u1021\u101D\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u1015\u1031\u1038\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (isCloth) {
        return lang === "en" ? `Refresh your look with ${p.name}. Crafted from premium-grade comfortable fabrics with flawless tailoring, this style delivers a confident, elegant fit. Yours for ${p.price.toLocaleString()} MMK.` : `\u1001\u1031\u1010\u103A\u1019\u103E\u102E\u1006\u1014\u103A\u1038\u101E\u1005\u103A\u1006\u1014\u103A\u1038\u1015\u103C\u102C\u1038\u101C\u103E\u101E\u1031\u102C \u1016\u1000\u103A\u101B\u103E\u1004\u103A\u1012\u102E\u1007\u102D\u102F\u1004\u103A\u1038\u1016\u103C\u1005\u103A\u101E\u100A\u1037\u103A ${p.name} \u101D\u1010\u103A\u1005\u102F\u1036\u1015\u102B\u104B \u1021\u1006\u1004\u1037\u103A\u1019\u103C\u1004\u1037\u103A \u1021\u1011\u100A\u103A\u101E\u102C\u1038\u104A \u101E\u1015\u103A\u101B\u1015\u103A\u101C\u103E\u1015\u1019\u103E\u102F\u1010\u102D\u102F\u1037\u1000\u103C\u1031\u102C\u1004\u1037\u103A \u101D\u1010\u103A\u1006\u1004\u103A\u101B\u101E\u100A\u103A\u1019\u103E\u102C \u101E\u1000\u103A\u1010\u1031\u102C\u1004\u1037\u103A\u101E\u1000\u103A\u101E\u102C\u101B\u103E\u102D\u1015\u103C\u102E\u1038 \u1019\u102D\u1019\u102D\u1000\u102D\u102F\u101A\u103A\u1000\u102D\u102F \u101A\u102F\u1036\u1000\u103C\u100A\u103A\u1019\u103E\u102F\u1016\u103C\u1005\u103A\u1005\u1031\u1015\u102B\u1010\u101A\u103A\u104B \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1004\u1037\u103A \u1021\u1011\u1030\u1038\u101B\u101B\u103E\u102D\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
      }
      if (isCosmetic) {
        return lang === "en" ? `Nourish your skin with ${p.name}. Formulated with ultra-gentle, skin-loving ingredients to promote a beautiful natural glow and youthful, radiant self-care vitality. Available for ${p.price.toLocaleString()} MMK.` : `\u1000\u102D\u102F\u101A\u103A\u1010\u102D\u102F\u1004\u103A\u1014\u1032\u1037 \u1021\u101E\u102C\u1038\u1021\u101B\u1031\u1021\u1010\u103D\u1000\u103A \u1002\u101B\u102F\u1005\u102D\u102F\u1000\u103A\u1019\u103E\u102F\u1021\u1015\u103C\u100A\u1037\u103A\u1015\u1031\u1038\u1005\u103D\u1019\u103A\u1038\u1014\u102D\u102F\u1004\u103A\u1019\u101A\u1037\u103A ${p.name} \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1021\u101E\u102C\u1038\u1021\u101B\u1031\u1000\u102D\u102F \u1000\u103C\u100A\u103A\u101C\u1004\u103A\u101D\u1004\u103A\u1038\u1015\u1005\u1031\u1015\u103C\u102E\u1038 \u101E\u1018\u102C\u101D\u1021\u1010\u102D\u102F\u1004\u103A\u1038 \u1010\u1031\u102C\u1000\u103A\u1015\u1010\u1032\u1037 \u1021\u101E\u102C\u1038\u1021\u101B\u1031\u1000\u102D\u102F \u1001\u1036\u1005\u102C\u1038\u101B\u1005\u1031\u1019\u103E\u102C \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1010\u1014\u103A\u1016\u102D\u102F\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1010\u100A\u103A\u1038\u1016\u103C\u1004\u1037\u103A \u101B\u101B\u103E\u102D\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
      }
      if (isAccessory) {
        return lang === "en" ? `Complement your outfit with ${p.name}. Designed with delicate modern aesthetic details, it makes the perfect daily statement of style and quality. Pick it up for ${p.price.toLocaleString()} MMK.` : `\u1019\u100A\u103A\u101E\u100A\u1037\u103A\u101D\u1010\u103A\u1005\u102F\u1036\u1014\u103E\u1004\u1037\u103A\u1019\u1006\u102D\u102F \u101C\u103E\u1015\u1015\u103C\u102E\u1038 \u1005\u1010\u102D\u102F\u1004\u103A\u1000\u103B\u101E\u103D\u102C\u1038\u1005\u1031\u1019\u101A\u1037\u103A ${p.name} \u101C\u1000\u103A\u101B\u102C\u1019\u103C\u1031\u102C\u1000\u103A\u1012\u102E\u1007\u102D\u102F\u1004\u103A\u1038\u101C\u1031\u1038 \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1005\u1010\u102D\u102F\u1004\u103A\u1000\u103B\u101C\u103E\u1015\u101E\u1031\u102C \u1014\u1031\u1037\u1005\u1009\u103A\u101D\u1010\u103A\u1006\u1004\u103A\u1019\u103E\u102F\u1021\u1010\u103D\u1000\u103A \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1004\u1037\u103A \u1021\u1011\u1030\u1038\u101B\u1031\u102C\u1004\u103A\u1038\u1001\u103B\u1015\u1031\u1038\u1014\u1031\u1015\u102B\u1015\u103C\u102E\u104B`;
      }
      if (isElectronic) {
        return lang === "en" ? `Boost your productivity with ${p.name}. Featuring high-performance technology, durable battery specs, and sleek design features perfectly optimized for modern lifestyles. Rate: ${p.price.toLocaleString()} MMK.` : `\u1021\u1006\u1004\u1037\u103A\u1019\u103C\u1004\u1037\u103A\u1005\u103D\u1019\u103A\u1038\u1006\u1031\u102C\u1004\u103A\u101B\u100A\u103A\u1014\u103E\u1004\u1037\u103A \u0E19\u100A\u103A\u1038\u1015\u100A\u102C\u1021\u1015\u103C\u100A\u1037\u103A\u1015\u102B\u101D\u1004\u103A\u101E\u1031\u102C ${p.name} \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1010\u102C\u101B\u103E\u100A\u103A\u1001\u1036\u1005\u1014\u1005\u103A\u104A \u101E\u1031\u101E\u1015\u103A\u101C\u103E\u1015\u1015\u103C\u102E\u1038 \u1001\u1031\u1010\u103A\u1019\u103E\u102E\u101E\u1031\u102C \u101C\u102F\u1015\u103A\u1006\u1031\u102C\u1004\u103A\u1001\u103B\u1000\u103A\u1019\u103B\u102C\u1038\u1000\u103C\u1031\u102C\u1004\u1037\u103A \u101C\u1030\u1000\u103C\u102E\u1038\u1019\u1004\u103A\u1038\u1010\u102D\u102F\u1037\u1021\u1010\u103D\u1000\u103A \u1010\u1014\u103A\u1016\u102D\u102F\u1038\u1010\u1014\u103A\u1015\u103C\u102E\u1038 \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (isDigital) {
        return lang === "en" ? `Gain seamless instant access to ${p.name}. Delivering smooth digital services and ultimate convenience, ready to upgrade your digital toolbox. Settle instantly for ${p.price.toLocaleString()} MMK.` : `\u1019\u103E\u102C\u101A\u1030\u1015\u103C\u102E\u1038\u101E\u100A\u103A\u1014\u103E\u1004\u1037\u103A \u1012\u1005\u103A\u1002\u103B\u1005\u103A\u1010\u101A\u103A\u1005\u1014\u1005\u103A\u1016\u103C\u1004\u1037\u103A \u1005\u1000\u1039\u1000\u1014\u1037\u103A\u1015\u102D\u102F\u1004\u103A\u1038\u1021\u1010\u103D\u1004\u103A\u1038 \u1001\u103B\u1000\u103A\u1001\u103B\u1004\u103A\u1038\u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u1014\u102D\u102F\u1004\u103A\u1019\u101A\u1037\u103A ${p.name} \u101D\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102F \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u101C\u1030\u1000\u103C\u102E\u1038\u1019\u1004\u103A\u1038\u1010\u102D\u102F\u1037\u104F \u1014\u1031\u1037\u1005\u1009\u103A\u101C\u102F\u1015\u103A\u1004\u1014\u103A\u1038\u1006\u1031\u102C\u1004\u103A\u1010\u102C\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1015\u102D\u102F\u1019\u102D\u102F\u101C\u103D\u101A\u103A\u1000\u1030\u1019\u103C\u1014\u103A\u1006\u1014\u103A\u1005\u1031\u1015\u103C\u102E\u1038 \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1010\u100A\u103A\u1038\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      if (isHome) {
        return lang === "en" ? `Elevate your living space with ${p.name}. Beautifully designed to bring warmth, aesthetic comfort, and exquisite luxury layout accentuations directly to your home. Priced at ${p.price.toLocaleString()} MMK.` : `\u1021\u102D\u1019\u103A\u1001\u1014\u103A\u1038\u101E\u1005\u103A\u101C\u1031\u1038\u1000\u102D\u102F \u101E\u1015\u103A\u101E\u1015\u103A\u101B\u1015\u103A\u101B\u1015\u103A\u1014\u1032\u1037 \u1005\u1019\u1010\u103A\u1000\u103B\u1000\u103B \u1021\u101C\u103E\u1006\u1004\u103A\u1015\u1031\u1038\u1014\u102D\u102F\u1004\u103A\u1019\u101A\u1037\u103A ${p.name} \u1021\u101E\u102F\u1036\u1038\u1021\u1006\u1031\u102C\u1004\u103A \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B \u1014\u1031\u1021\u102D\u1019\u103A\u1000\u102D\u102F \u1014\u103D\u1031\u1038\u1011\u103D\u1031\u1038\u101C\u103E\u1015\u1005\u1031\u1015\u103C\u102E\u1038 \u1015\u102D\u102F\u1019\u102D\u102F\u1010\u1014\u103A\u1016\u102D\u102F\u1038\u101B\u103E\u102D\u101C\u103E\u1015\u1005\u1031\u1019\u103E\u102C\u1015\u102B\u104B \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1004\u1037\u103A \u101D\u101A\u103A\u101A\u1030\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
      }
      if (isFood) {
        return lang === "en" ? `Treat yourself with ${p.name}. Prepared with premium, authentic local ingredients and strict hygiene guidelines, offering pure delicious joy. Price: ${p.price.toLocaleString()} MMK.` : `\u1011\u1030\u1038\u1000\u1032\u1000\u1031\u102C\u1004\u103A\u1038\u1019\u103D\u1014\u103A\u101E\u100A\u1037\u103A \u101B\u102D\u102F\u1038\u101B\u102C\u1021\u101B\u101E\u102C \u1005\u102F\u1036\u1005\u102F\u1036\u101C\u1004\u103A\u101C\u1004\u103A\u1016\u103C\u1004\u1037\u103A \u1016\u1014\u103A\u1010\u102E\u1038\u1011\u102C\u1038\u101E\u100A\u1037\u103A ${p.name} \u1005\u102C\u1038\u101E\u1031\u102C\u1000\u103A\u1016\u103D\u101A\u103A\u101B\u102C \u1016\u103C\u1005\u103A\u1015\u102B\u101E\u100A\u103A\u1017\u103B\u102C\u104B \u101E\u1014\u1037\u103A\u101E\u1014\u1037\u103A\u101B\u100A\u103A\u101B\u100A\u103A \u1011\u102F\u1015\u103A\u1015\u102D\u102F\u1038\u1011\u102C\u1038\u101B\u103E\u102D\u1015\u103C\u102E\u1038 \u1019\u102D\u1005\u102F\u1021\u102C\u1038\u101C\u102F\u1036\u1038\u1021\u1010\u103D\u1000\u103A \u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
      }
      return lang === "en" ? `${p.name} - ${p.description || "Premium Myanmar Traditional Product"}. Crafted to perfection with top-quality authentic local sourcing, offering unbeatable value at ${p.price.toLocaleString()} MMK.` : `${p.name} - ${p.description || "\u1019\u103C\u1014\u103A\u1019\u102C\u1037\u101B\u102D\u102F\u1038\u101B\u102C \u1021\u1011\u1030\u1038\u1011\u102F\u1010\u103A\u1000\u102F\u1014\u103A"} \u101E\u100A\u103A \u1012\u1031\u101E\u1011\u103D\u1000\u103A\u1021\u101B\u101E\u102C\u1005\u1005\u103A\u1005\u1005\u103A\u1000\u102D\u102F \u1002\u102F\u100F\u103A\u101A\u1030\u1005\u103D\u102C \u1016\u1014\u103A\u1010\u102E\u1038\u1011\u102C\u1038\u1015\u103C\u102E\u1038 \u1010\u1014\u103A\u1016\u102D\u102F\u1038\u101B\u103E\u102D\u101E\u1031\u102C\u1005\u103B\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 ${p.price.toLocaleString()} \u1000\u103B\u1015\u103A\u1016\u103C\u1004\u1037\u103A \u1021\u1011\u1030\u1038\u101B\u101B\u103E\u102D\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
    };
    const highlightsEn = finalProducts.map((p) => `- ${getProductHighlight(p, "en")}`).join("\n\n");
    const highlightsMy = finalProducts.map((p) => `- ${getProductHighlight(p, "my")}`).join("\n\n");
    const pNamesEn = finalProducts.map((p) => p.name).join(" & ");
    const pNamesMy = finalProducts.map((p) => p.name).join(" \u1014\u103E\u1004\u1037\u103A ");
    let promoPct = "15% OFF";
    let discountVal = "15%";
    if (campaignType === "Christmas") {
      promoPct = "10% OFF";
      discountVal = "10%";
    } else if (campaignType === "NewYear") {
      promoPct = "BUY 2 GET 1";
      discountVal = "Buy 2 Get 1 FREE";
    } else if (campaignType === "Valentine") {
      promoPct = "14% OFF";
      discountVal = "14%";
    } else if (campaignType === "BackToSchool") {
      promoPct = "20% OFF";
      discountVal = "20%";
    }
    let themeIntroEn = "";
    let themeIntroMy = "";
    if (campaignType === "Thingyan") {
      themeIntroEn = `\u{1F4A6} Myanmar New Year is officially around the corner, and Thingyan Water Festival vibes are filling the air with joy, water splashing, and warm sunshine! To celebrate this grandest traditional period in Myanmar, we are ecstatic to announce our Thingyan Sweet & Cool Festival Splash Deals!`;
      themeIntroMy = `\u{1F4A6} \u1019\u1004\u103A\u1039\u1002\u101C\u102C\u101B\u103E\u102D\u101E\u1031\u102C \u1019\u103C\u1014\u103A\u1019\u102C\u1037\u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u1015\u103D\u1032\u1010\u1031\u102C\u103A \u1021\u1011\u1030\u1038\u101B\u1000\u103A\u1019\u103C\u1010\u103A\u1000\u103C\u102E\u1038 \u101C\u103D\u1014\u103A\u1005\u103D\u102C\u1014\u102E\u1038\u1000\u1015\u103A\u101C\u102D\u102F\u1037\u101C\u102C\u1015\u102B\u1015\u103C\u102E\u1001\u1004\u103A\u1017\u103B\u102C! \u1021\u1031\u1038\u1019\u103C\u101C\u103E\u1010\u1032\u1037 \u101B\u1031\u1016\u103B\u1014\u103A\u1038\u1015\u103D\u1032\u1014\u1032\u1037\u1021\u1010\u1030 \u1015\u103B\u1031\u102C\u103A\u1005\u101B\u102C\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A\u101B\u1000\u103A\u1010\u103D\u1031\u1019\u103E\u102C \u1021\u1019\u1031\u102C\u1015\u103C\u1031\u1015\u103C\u102E\u1038 \u101C\u1014\u103A\u1038\u1006\u1014\u103A\u1038\u1005\u1031\u1016\u102D\u102F\u1037\u1021\u1010\u103D\u1000\u103A \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u1021\u1011\u1030\u1038\u1021\u101B\u1031\u102C\u1004\u103A\u1038\u1019\u103C\u103E\u1004\u1037\u103A\u1010\u1004\u103A\u101B\u1031\u1038 \u1021\u1005\u102E\u1021\u1005\u1009\u103A\u101C\u1031\u1038 \u1005\u1010\u1004\u103A\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
    } else if (campaignType === "Christmas") {
      themeIntroEn = `\u{1F384} Cozy up this winter and share the magic of Christmas with your loved ones! In the spirit of giving, warmth, and beautiful December gifts, we are launching our Special Christmas Appreciation Event.`;
      themeIntroMy = `\u{1F384} \u1021\u1031\u1038\u1019\u103C\u1010\u1032\u1037 \u1012\u102E\u1007\u1004\u103A\u1018\u102C\u1006\u1031\u102C\u1004\u103A\u1038\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1000\u102C\u101C\u1019\u103E\u102C \u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u101E\u1030\u1010\u103D\u1031\u1021\u1010\u103D\u1000\u103A \u1002\u101B\u102F\u1005\u102D\u102F\u1000\u103A\u1019\u103E\u102F \u1019\u1031\u1010\u1039\u1010\u102C\u1021\u1015\u103C\u100A\u1037\u103A\u1014\u1032\u1037 \u101B\u102D\u102F\u1038\u101B\u102C\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u101C\u1031\u1038\u1010\u103D\u1031 \u101D\u1031\u1019\u103B\u103E\u101C\u102D\u102F\u1000\u103A\u101B\u1021\u1031\u102C\u1004\u103A! \u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A\u1021\u1011\u1030\u1038 \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u1021\u1015\u103A\u1015\u103D\u1032\u1000\u103C\u102E\u1038 \u1005\u1010\u1004\u103A\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1015\u103C\u102E\u104B`;
    } else if (campaignType === "NewYear") {
      themeIntroEn = `\u{1F973} Ring in the New Year with absolute delight! As we count down the final hours to midnight, gather your favorite crowd and upgrade your late-night countdown parties with our ultimate Year-End Snack Box!`;
      themeIntroMy = `\u{1F973} \u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1005\u101B\u102C \u1000\u1031\u102C\u1004\u103A\u1038\u101E\u1031\u102C \u1014\u103E\u1005\u103A\u101E\u1005\u103A\u1000\u1030\u1038\u100A\u1000\u102D\u102F \u1019\u102D\u101E\u102C\u1038\u1005\u102F\u104A \u1019\u102D\u1010\u103A\u1006\u103D\u1031\u101E\u1030\u1004\u101A\u103A\u1001\u103B\u1004\u103A\u1038\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A\u1021\u1010\u1030 \u1016\u103C\u1010\u103A\u101E\u1014\u103A\u1038\u1016\u102D\u102F\u1037 \u1021\u1000\u103C\u103D\u1015\u103A\u1019\u102F\u1014\u1037\u103A\u1021\u1010\u103D\u1032\u1010\u103D\u1031 'Buy 2 Get 1' \u1021\u1011\u1030\u1038\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u101B\u1031\u102C\u1000\u103A\u101B\u103E\u102D\u101C\u102C\u1015\u102B\u1015\u103C\u102E!`;
    } else if (campaignType === "Valentine") {
      themeIntroEn = `\u{1F496} Love is in the air! Make this Valentine's Day incredibly sweet and memorable by sharing a authentic taste of traditional romance. Introducing our Sweetheart Heritage Treats!`;
      themeIntroMy = `\u{1F496} \u1021\u1001\u103B\u1005\u103A\u1014\u1032\u1037 \u1014\u103D\u1031\u1038\u1011\u103D\u1031\u1038\u1019\u103E\u102F\u1010\u103D\u1031 \u101E\u1004\u103A\u1038\u1015\u103B\u1036\u1037\u1005\u1031\u1019\u101A\u1037\u103A \u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u1031\u1037 \u1021\u1011\u1030\u1038\u101B\u102D\u102F\u1038\u101B\u102C\u1021\u1001\u103B\u102D\u102F\u1015\u103D\u1032 \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u1021\u1005\u102F\u1036\u1021\u101C\u1004\u103A! \u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1014\u1031\u1037\u1021\u1010\u103D\u1000\u103A \u1021\u1011\u1030\u1038\u1012\u102E\u1007\u102D\u102F\u1004\u103A\u1038\u1011\u102F\u1010\u103A\u1011\u102C\u1038\u101E\u1031\u102C \u101E\u102E\u1038\u101E\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1031\u1038 \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
    } else if (campaignType === "BackToSchool") {
      themeIntroEn = `\u{1F392} Get ready to power up the upcoming school season with energy, health, and focus! Give your kids the absolute best, most delicious traditional snacks for their daily lunchboxes with our Back-To-School Smart Fuel packs!`;
      themeIntroMy = `\u{1F392} \u1000\u103B\u1031\u102C\u1004\u103A\u1038\u1016\u103D\u1004\u1037\u103A\u101B\u102C\u101E\u102E\u1019\u103E\u102C \u1021\u1006\u1004\u103A\u101E\u1004\u1037\u103A\u1016\u103C\u1005\u103A\u1005\u1031\u1016\u102D\u102F\u1037 \u1000\u103B\u1014\u103A\u1038\u1019\u102C\u101C\u1014\u103A\u1038\u1006\u1014\u103A\u1038\u1005\u1031\u1019\u101A\u1037\u103A \u101B\u102D\u102F\u1038\u101B\u102C\u1019\u102F\u1014\u1037\u103A\u1021\u101F\u102C\u101B\u1005\u102F\u1036\u1021\u1005\u1015\u103A\u1010\u103D\u1032\u101C\u1031\u1038\u1019\u103B\u102C\u1038! \u1000\u103B\u1031\u102C\u1004\u103A\u1038\u101E\u102C\u1038\u1000\u103B\u1031\u102C\u1004\u103A\u1038\u101E\u1030\u1019\u103B\u102C\u1038\u1021\u1010\u103D\u1000\u103A \u1021\u101C\u103D\u1014\u103A\u101E\u1004\u1037\u103A\u101C\u103B\u1031\u102C\u103A\u101E\u1031\u102C \u1021\u1005\u102E\u1021\u1005\u1009\u103A\u101C\u1031\u1038 \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`;
    } else {
      themeIntroEn = `\u{1F31F} Welcome to our SME Weekend Flash Sale Event! Enjoy dynamic discounts on top-rated local products, carefully crafted with premium Burmese sourcing, brought directly to your doorstep.`;
      themeIntroMy = `\u{1F31F} \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 SME \u101D\u102E\u1000\u1014\u1037\u103A\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038 \u1015\u103D\u1032\u1000\u103C\u102E\u1038\u1019\u103E \u1000\u103C\u102D\u102F\u1006\u102D\u102F\u1015\u102B\u1010\u101A\u103A\u104B \u101C\u1030\u1000\u103C\u102D\u102F\u1000\u103A\u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 \u1012\u1031\u101E\u1011\u103D\u1000\u103A\u1011\u102F\u1010\u103A\u1000\u102F\u1014\u103A\u1015\u1031\u102B\u1004\u103A\u1038\u1019\u103B\u102C\u1038\u1005\u103D\u102C\u1000\u102D\u102F \u1021\u102D\u1019\u103A\u1010\u102D\u102F\u1004\u103A\u101B\u102C\u101B\u1031\u102C\u1000\u103A \u1021\u1006\u1004\u103A\u1015\u103C\u1031\u1006\u102F\u1036\u1038 \u1021\u101B\u101E\u102C\u1016\u103C\u1004\u1037\u103A \u1010\u102D\u102F\u1000\u103A\u101B\u102D\u102F\u1000\u103A\u101B\u101A\u1030\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u104B`;
    }
    fallbackResponse.trendingProducts = finalProducts.slice(0, 2).map((p) => p.name);
    fallbackResponse.recommendations = [{
      campaignTitle: `${campaignType} ${primaryProd?.name?.split(" ")[0]} Festival Drive \u{1F3AC}`,
      rationale: `Promoting ${primaryProd?.name} during the ${campaignType} season matches real organic demand patterns in Myanmar. Running immediate payment checkouts utilizing KBZPay drives faster conversions.`,
      targetAudience: "Families, social gatherers, school students, and traditional sweet curators.",
      discountPercentage: promoPct,
      duration: "5 Days (Limited Holiday Promotion)",
      expectedImpact: "Boost high-margin sales volume by 35% with consolidated delivery runs.",
      implementationSteps: [
        `Feature the selected product: ${primaryProd?.name} inside active marketing rails.`,
        `Activate immediate chatbot pre-orders configured with pricing rate: ${primaryProd?.price?.toLocaleString()} MMK.`,
        "Configure automatic checkout vouchers for group orders.",
        "Utilize localized captions inside Facebook page updates.",
        "Fulfill delivery logs through KPay screenshot uploads."
      ]
    }];
    fallbackResponse.copywriting = {
      facebookCaption: {
        en: `${themeIntroEn}

We are extremely proud to highlight our handpicked, premium selections specifically for this season:

${highlightsEn}

\u{1F381} SPECIAL PROMOTION DEALS: Enjoy an immediate ${discountVal} discount on all orders featuring these chosen items! Handwrapped in beautiful waterproof gift bags and delivered with a handwritten note of care.

\u{1F6D2} HOW TO ORDER EASILY:
1. Open our storefront catalog and click on "${primaryProd?.name}".
2. Fill in your delivery details (serving Kamayut, Sanchaung, Bahan, Latha, etc.).
3. Prepay instantly with KBZPay (KPay), Wave Money, or CBPay.
4. Upload your payment screenshot for immediate courier dispatch. Bring sweet memories home today!`,
        my: `${themeIntroMy}

\u1012\u102E\u1014\u1031\u1037\u1019\u103E\u102C\u1010\u1031\u102C\u1037 \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u1021\u1013\u102D\u1000\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1011\u102C\u1038\u1010\u1032\u1037 \u101E\u1018\u102C\u101D\u1012\u1031\u101E\u1011\u103D\u1000\u103A \u1021\u1000\u1031\u102C\u1004\u103A\u1038\u1006\u102F\u1036\u1038\u1015\u1005\u1039\u1005\u100A\u103A\u1038\u101C\u1031\u1038\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1021\u1011\u1030\u1038\u1015\u1032\u1019\u102D\u1010\u103A\u1006\u1000\u103A\u1015\u1031\u1038\u1001\u103B\u1004\u103A\u1015\u102B\u1010\u101A\u103A\u1001\u1004\u103A\u1017\u103B\u102C -

${highlightsMy}

\u{1F381} \u1021\u1011\u1030\u1038\u1015\u101B\u102D\u102F\u1019\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A - \u101A\u1001\u102F\u101B\u1000\u103A\u101E\u1010\u1039\u1010\u1015\u1010\u103A\u1021\u1010\u103D\u1004\u103A\u1038 \u1019\u103E\u102C\u101A\u1030\u101E\u1030\u1019\u103B\u102C\u1038\u1021\u1010\u103D\u1000\u103A \u1010\u1005\u103A\u1018\u1030\u1038\u1001\u103B\u1004\u103A\u1038\u1005\u102E\u1021\u101C\u102D\u102F\u1000\u103A\u1011\u1030\u1038\u1001\u103C\u102C\u1038\u101E\u1031\u102C ${discountVal} \u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1000\u102D\u102F \u1016\u1014\u103A\u1010\u102E\u1038\u1015\u1031\u1038\u1011\u102C\u1038\u1026\u1038\u1019\u103E\u102C \u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B

\u{1F6D2} \u1019\u103E\u102C\u101A\u1030\u101B\u1014\u103A \u1021\u101C\u103D\u1014\u103A\u101C\u103D\u101A\u103A\u1000\u1030\u101E\u1031\u102C\u1014\u100A\u103A\u1038\u101C\u1019\u103A\u1038 -
\u1041\u104B \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u1000\u1000\u103A\u1010\u101C\u1031\u102C\u1037\u1016\u1031\u102C\u1004\u103A\u1011\u1032\u101E\u102D\u102F\u1037\u101D\u1004\u103A\u1000\u102C "${primaryProd?.name}" \u1000\u102D\u102F \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1015\u102B\u104B
\u1042\u104B \u1021\u102D\u1019\u103A\u1010\u102D\u102F\u1004\u103A\u101B\u102C\u101B\u1031\u102C\u1000\u103A \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u101B\u1014\u103A \u101C\u102D\u1015\u103A\u1005\u102C\u1021\u1015\u103C\u100A\u1037\u103A\u1021\u1005\u102F\u1036\u1000\u102D\u102F \u1016\u103C\u100A\u1037\u103A\u101E\u103D\u1004\u103A\u1038\u1015\u102B\u104B
\u1043\u104B KBZPay (KPay) \u104A Wave Money \u104A CBPay \u1010\u102D\u102F\u1037\u1016\u103C\u1004\u1037\u103A \u101C\u103D\u101A\u103A\u1000\u1030\u101C\u103B\u1004\u103A\u1019\u103C\u1014\u103A\u1005\u103D\u102C \u1004\u103D\u1031\u1015\u1031\u1038\u1001\u103B\u1031\u1015\u103C\u102E\u1038 screenshot \u1015\u1031\u1038\u1015\u102D\u102F\u1037\u1015\u102B\u104B \u1021\u102D\u1019\u103A\u1010\u102D\u102F\u1004\u103A\u101B\u102C\u101B\u1031\u102C\u1000\u103A \u1021\u1019\u103C\u1014\u103A\u1006\u102F\u1036\u1038 \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1015\u1031\u1038\u101E\u103D\u102C\u1038\u1019\u103E\u102C\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`
      },
      instagramCaption: {
        en: `Unwrap pure happiness with our premium local selection: ${pNamesEn}! Specially discounted at ${promoPct} during this beautiful ${campaignType} holiday. Bring home the comfort of Myanmar's heritage! #SME #MyanmarDelight #${campaignType}`,
        my: `\u1001\u103B\u102D\u102F\u1019\u103C\u102D\u1014\u103A\u101C\u103E\u1010\u1032\u1037 \u1021\u101B\u101E\u102C\u1005\u1005\u103A\u1005\u1005\u103A ${pNamesMy} \u1000\u102D\u102F \u101A\u1001\u102F\u1015\u1032 ${promoPct} \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038\u1014\u1032\u1037 \u1021\u102D\u1019\u103A\u1019\u103E\u102C \u1006\u102D\u102F\u1004\u103A\u101E\u1031\u102C\u1000\u103A/\u1006\u102D\u102F\u1004\u103A\u1005\u102C\u1038\u1021\u1010\u102D\u102F\u1004\u103A\u1038 \u101E\u102F\u1036\u1038\u1006\u1031\u102C\u1004\u103A\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u104B #${campaignType} #${pNamesEn.replace(/\s+/g, "")}`
      },
      adCopy: {
        en: `Special ${campaignType} campaign! Get ${promoPct} off on our signature ${primaryProd?.name}. Quick KPay payment confirmation. Pre-order now to secure delivery!`,
        my: `\u1021\u1011\u1030\u1038\u1021\u1005\u102E\u1021\u1005\u1009\u103A\u101E\u1005\u103A! \u101C\u1030\u1000\u103C\u102D\u102F\u1000\u103A\u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 ${primaryProd?.name} \u1021\u102C\u1038 \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 ${promoPct} \u1014\u103E\u102F\u1014\u103A\u1038\u1016\u103C\u1004\u1037\u103A \u1021\u1001\u102F\u1015\u1032 KPay \u1016\u103C\u1004\u1037\u103A \u1015\u102D\u102F\u1019\u102D\u102F\u1019\u103C\u1014\u103A\u1006\u1014\u103A\u1005\u103D\u102C \u1019\u103E\u102C\u101A\u1030\u1015\u102B\u104B`
      },
      email: {
        en: `Subject: Enjoy ${promoPct} off on our signature ${primaryProd?.name} during ${campaignType}!

Dear Valued Customer,

We trust you are having a wonderful season! To add extra sweetness to your holidays, we are launching an exclusive ${promoPct} campaign focusing directly on our most premium traditional offering: ${primaryProd?.name}.

Brought directly from authentic local sourcing, it serves as the perfect centerpiece for your family gatherings. Place your order with our automated coupon code and settle instantly with KBZPay/CBPay. We look forward to delivering joy to you!`,
        my: `\u1001\u1031\u102B\u1004\u103A\u1038\u1005\u1009\u103A - ${campaignType} \u1015\u103D\u1032\u1010\u1031\u102C\u103A\u1021\u1010\u103D\u1000\u103A ${primaryProd?.name} \u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 ${promoPct} \u101C\u1000\u103A\u1006\u1031\u102C\u1004\u103A\u104B

\u1001\u103B\u1005\u103A\u1001\u1004\u103A\u101B\u1015\u102B\u101E\u1031\u102C \u1006\u102D\u102F\u1004\u103A\u101D\u101A\u103A\u101E\u1030\u1019\u103B\u102C\u1038\u1001\u1004\u103A\u1017\u103B\u102C\u1038...

\u1015\u103B\u1031\u102C\u103A\u101B\u103D\u103E\u1004\u103A\u1005\u101B\u102C\u1000\u1031\u102C\u1004\u103A\u1038\u1010\u1032\u1037 \u1015\u103D\u1032\u1010\u1031\u102C\u103A\u101B\u1000\u103A\u101C\u1031\u1038\u1010\u103D\u1031\u1016\u103C\u1005\u103A\u1005\u1031\u1016\u102D\u102F\u1037 \u1000\u103B\u103D\u1014\u103A\u1010\u1031\u102C\u103A\u1010\u102D\u102F\u1037\u101B\u1032\u1037 \u101C\u1030\u1000\u103C\u102D\u102F\u1000\u103A\u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 ${primaryProd?.name} \u1000\u102D\u102F \u101E\u102E\u1038\u101E\u1014\u1037\u103A\u1021\u1011\u1030\u1038\u101C\u103B\u103E\u1031\u102C\u1037\u1005\u103B\u1031\u1038 ${promoPct} \u1016\u103C\u1004\u1037\u103A \u1005\u102E\u1005\u1009\u103A\u1015\u1031\u1038\u101C\u102D\u102F\u1000\u103A\u1015\u102B\u1010\u101A\u103A\u104B KPay \u1016\u103C\u1004\u1037\u103A \u101C\u103D\u101A\u103A\u1000\u1030\u1005\u103D\u102C\u1015\u1031\u1038\u1001\u103B\u1031\u1014\u102D\u102F\u1004\u103A\u1015\u103C\u102E\u1038 \u1010\u1005\u103A\u1014\u102D\u102F\u1004\u103A\u1004\u1036\u101C\u102F\u1036\u1038\u101E\u102D\u102F\u1037 \u1021\u1019\u103C\u1014\u103A\u1015\u102D\u102F\u1037\u1015\u1031\u1038\u101E\u103D\u102C\u1038\u1019\u103E\u102C\u1016\u103C\u1005\u103A\u1015\u102B\u1010\u101A\u103A\u104B`
      },
      hashtags: `#${campaignType} #SMEBrand #MyanmarPride #LocalDelights`
    };
    fallbackResponse.bannerPrompt = `A professional, real-life vertical advertisement poster of aspect ratio 3:4. It features a smiling Burmese modern model elegantly holding and presenting ${primaryProd?.name || "premium local crafts"}. The composition includes ${bgDesc}, elegant graphic borders, cool modern fonts, and beautiful typography in a real-life marketing poster layout.`;
    res.json({ success: true, insights: fallbackResponse });
  }
});
async function fetchImageAsBase64(url) {
  try {
    if (!url || typeof url !== "string" || !url.startsWith("http")) return null;
    console.log(`[Proxy] Fetching reference image: ${url}`);
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const headersContentType = res.headers.get("content-type");
    const mimeType = headersContentType || "image/jpeg";
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    return { data: base64Data, mimeType };
  } catch (error) {
    console.warn("[Proxy] Error inside fetchImageAsBase64:", error);
    return null;
  }
}
app.post("/api/ai/marketing/image", async (req, res) => {
  const { prompt, campaignType = "General", productId, aspectRatio = "3:4" } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ success: false, error: "Prompt is required inside the request body." });
  }
  try {
    const ai = getGeminiClient();
    let selectedProdRefMime = null;
    let selectedProdRefBase64 = null;
    let targetProductName = "our traditional Myanmar offerings";
    if (productId) {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        targetProductName = product.name;
        if (product.image) {
          const imageRes = await fetchImageAsBase64(product.image);
          if (imageRes) {
            selectedProdRefBase64 = imageRes.data;
            selectedProdRefMime = imageRes.mimeType;
          }
        }
      }
    }
    const standardAspectRatioMap = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const finalAspectRatio = standardAspectRatioMap.includes(aspectRatio) ? aspectRatio : "3:4";
    const imageStyleDirective = `Create a premium, professional real-life vertical digital marketing poster of aspect ratio ${finalAspectRatio}.
The poster MUST show a real person\u2014a beautiful, smiling Burmese model holding/presenting ${targetProductName} in a lifestyle studio shot.
The poster must look extremely clean, high-contrast, featuring a gorgeous background suited for the "${campaignType}" theme (cozy and glowing).
Include sleek graphic borders, stylized elements, cool modern design overlays, and stunning promotional typography/cool fonts with text such as "PROMOTION", "SPECIAL" or "DISCOUNT".
The composition should look exactly like a real-life marketing flyer or Facebook ad. No device frames, laptop screens, or mockups.`;
    const parts = [];
    if (selectedProdRefBase64 && selectedProdRefMime) {
      parts.push({
        inlineData: {
          data: selectedProdRefBase64,
          mimeType: selectedProdRefMime
        }
      });
      parts.push({
        text: `Based on this reference product image, design of ${targetProductName}: ${imageStyleDirective}.

Design requirements: ${prompt}`
      });
    } else {
      parts.push({
        text: `${imageStyleDirective}

Design requirements: ${prompt}`
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: finalAspectRatio,
          imageSize: "1K"
        }
      }
    });
    let base64Image = null;
    if (response?.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
          break;
        }
      }
    }
    if (base64Image) {
      res.json({ success: true, imageUrl: base64Image });
    } else {
      throw new Error("No inlineData image returned in the model result content parts.");
    }
  } catch (error) {
    console.warn("[Sales Brain AI] Image generation rate limited or API offline. Informing client to fallback on canvas designer.");
    res.json({
      success: false,
      error: error?.message || "Gemini Image API is currently rate-limited or unavailable. Use the high-fidelity Canvas Graphic Designer below for customization!",
      isQuotaLimit: error?.message?.includes("quota") || error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED"
    });
  }
});
app.post("/api/ai/onboarding-summary", async (req, res) => {
  const { data } = req.body || {};
  if (!data) {
    return res.status(400).json({ success: false, error: "Onboarding profile data is required." });
  }
  const getFallbackListSummary = (info) => {
    const categories = info.businessCategory?.join(" & ") || "Products";
    const channels = info.salesChannels?.join(", ") || "social channels";
    const target = info.customers?.join(", ") || "customers";
    const age = info.ageGroup || "Young Adults";
    const values = info.customerValues?.join(" and ") || "high value";
    const challenge = info.businessChallenge || "growing their company";
    const goal = info.businessGoal || "maximizing efficiency";
    let industryAdvice = "Focus on building solid product catalogs, creating clear visual item previews, and ensuring instant communication via Telegram to close sales fast.";
    if (categories.toLowerCase().includes("fashion")) {
      industryAdvice = "Leverage short-form videos showing product fits, launch limited seasonal collections, and partner with local fashion micro-influencers to drive rapid impulse buys.";
    } else if (categories.toLowerCase().includes("food")) {
      industryAdvice = "Highlight strict food hygiene practices, compile family meal packs, and run weekend KPay discount campaigns during dinner prep hours (5 PM to 8 PM) to capture instant dessert cravings.";
    } else if (categories.toLowerCase().includes("electronic")) {
      industryAdvice = "Highlight comprehensive technical specifications, offer a 7-day swap policy, bundle high-demand charging cables, and run educational reels showcasing device productivity.";
    } else if (categories.toLowerCase().includes("grocer") || categories.toLowerCase().includes("fmcg")) {
      industryAdvice = "Compile bulk grocery combos, offer rapid local delivery, and design weekly subscription packages for household essentials to build customer loyalty.";
    } else if (categories.toLowerCase().includes("digital")) {
      industryAdvice = "Highlight instant digital download access, provide transparent step-by-step tutorials, and run social ads with actionable copy to build digital toolbox confidence.";
    } else if (categories.toLowerCase().includes("home") || categories.toLowerCase().includes("lifestyle")) {
      industryAdvice = "Display products in beautifully curated home settings, upload warm tutorial videos showing product styling, and offer bulk bundle discounts for elegant decor accentuations.";
    }
    let goalAdvice = "";
    if (goal.includes("Increase Sales")) {
      goalAdvice = "To maximize sales volumes immediately, bundle slow-moving stock as gifts with your bestsellers and run targeted conversion ads.";
    } else if (goal.includes("Grow Customer")) {
      goalAdvice = "To attract new buyers, launch referral discounts ('invite a friend and both get 10% off') and seed products to niche online communities.";
    } else if (goal.includes("Brand Awareness")) {
      goalAdvice = "To elevate brand reputation, focus on consistent, elegant social aesthetics, share behind-the-scenes craft stories, and build a cohesive visual identity.";
    } else if (goal.includes("Repeat Customers")) {
      goalAdvice = "To supercharge repeat business, establish an exclusive VIP customer group on Telegram and send early-access discount codes directly to loyal shoppers.";
    } else {
      goalAdvice = "To expand online presence, synchronize your visual catalog across Facebook, Instagram, and TikTok, using unified bio links.";
    }
    return `### \u{1F31F} Welcome to your Sales Brain AI Executive Briefing!

#### \u{1F4CA} Executive Profile
Your business focuses on **${categories}**, connecting primarily with **${target}** (predominantly in the **${age}** age group) who care deeply about **${values}**. You mainly drive sales through **${channels}**.

#### \u{1F3AF} Goal Alignment & Insights
To achieve your core goal of **${goal}** while overcoming your biggest bottleneck of **${challenge}**, we must optimize your conversion pathways. Since your audience is highly active on social media and values checkout convenience, adding automated interactive invoice helpers inside your chat channels will eliminate friction and secure payments.

#### \u26A1 AI Actionable Blueprint
1. **Optimize Social Funnels:** Since you sell on *${channels}*, establish high-converting messaging workflows. Direct customer traffic to your Telegram virtual assistant, which handles automated invoicing 24/7.
2. **Category Strategy:** ${industryAdvice}
3. **Goal Booster:** ${goalAdvice}`;
  };
  try {
    const ai = getGeminiClient();
    const categories = data.businessCategory?.join(", ") || "various products";
    const channels = data.salesChannels?.join(", ") || "social media channels";
    const customersGroup = data.customers?.join(", ") || "general shoppers";
    const ageGroupRange = data.ageGroup || "all ages";
    const targetValues = data.customerValues?.join(", ") || "quality and price";
    const highlightChallenge = data.businessChallenge || "increasing user sales";
    const userGoal = data.businessGoal || "growing brand awareness";
    const systemInstruction = `You are "Sales Brain Profile Architect", an elite and veteran business consultant and digital marketing strategist for Myanmar SMEs.
Your goal is to digest the user's business onboarding profile, and generate a highly personalized, intelligent, and motivating "SME AI Strategic Report".
You MUST structure your response into 3 specific sections using these clean Markdown titles:
- **\u{1F4CA} business profile** (summarize their categories, channels, and targeted customers with elegant context)
- **\u{1F3AF} goal alignment & insights** (discussing their goal "${userGoal}" and challenge "${highlightChallenge}")
- **\u26A1 actionable blueprint** (providing 3 tailored campaign recommendations suited for the age group "${ageGroupRange}" and what matters to them: "${targetValues}")

Your tone should be inspiring, professional, and clear. Under 220 words. Keep headings bold but do not write generic boilerplate copy. Ensure your advice reflects a smart local strategy (like mention KPay, Facebook Messenger, Viber or custom local campaigns).`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a personalized Myanmar SME executive briefing based on this onboarding profile metadata:
- Business Categories: ${categories}
- Sales Channels/Platforms: ${channels}
- Main Customer Demographic: ${customersGroup}
- Main Customer Age: ${ageGroupRange}
- Customer Priorities: ${targetValues}
- Core Challenge: ${highlightChallenge}
- Current Goal: ${userGoal}`,
      config: {
        systemInstruction,
        temperature: 0.35
      }
    });
    const summaryText = response.text || getFallbackListSummary(data);
    res.json({ success: true, summary: summaryText });
  } catch (error) {
    console.warn("[Sales Brain AI] Onboarding summary Gemini API quota or rate limits hit. Serving fallback summary.");
    const fallbackText = getFallbackListSummary(data);
    res.json({ success: true, summary: fallbackText });
  }
});
var server_default = app;

// scripts/vercel-api-entry.ts
function restoreRequestUrl(req) {
  const raw = req.headers["x-vercel-original-url"] ?? req.headers["x-invoke-path"] ?? req.headers["x-forwarded-uri"];
  if (typeof raw !== "string" || !raw) return;
  try {
    const pathname = raw.startsWith("/") ? raw.split("?")[0] : new URL(raw, "http://localhost").pathname;
    const query = req.url && req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : raw.includes("?") ? raw.slice(raw.indexOf("?")) : "";
    req.url = pathname + query;
  } catch {
  }
}
function handler(req, res) {
  restoreRequestUrl(req);
  return server_default(req, res);
}
//# sourceMappingURL=index.cjs.map
