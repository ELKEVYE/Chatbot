import React, { useState, useEffect, useRef } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Stack,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const API_URL = "http://127.0.0.1:8000/ask/"; // Django API

// 🎨 Thème façon WhatsApp
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#075E54", // vert WhatsApp
    },
    secondary: {
      main: "#25D366", // vert clair
    },
    background: {
      default: "#0a1014",
      paper: "#ECE5DD", // beige de chat
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

export default function App() {
  const [messages, setMessages] = useState([
    // {
    //   from: "patoche",
    //   text: "Alors, qui vient me raconter ses misères de génération Wi-Fi ?",
    // },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}?msg=${encodeURIComponent(msg)}`);
      const data = await res.json();

      let text = data.reponse || "Euh… Patoche n’a rien compris, mon grand.";
      if (Math.random() < 0.15) text = text.toUpperCase() + "!!!";

      setMessages((prev) => [...prev, { from: "patoche", text }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          from: "patoche",
          text:
            "J’ai mis du pastaga sur le serveur ! Recommence, espèce de zozo !",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Fond global style WhatsApp Web */}
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom, #0a1014 0, #0a1014 30%, #0d1418 30%, #0d1418 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
         {/* ⭐️ TON LOGO ICI ⭐️ */}
   
        <Container maxWidth="md">
          {/* “Fake” fond de chat avec pattern clair */}
          <Paper
            elevation={8}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              height: { xs: "90vh", md: "80vh" },
              display: "flex",
              flexDirection: "column",
              bgcolor: "#ECE5DD",
            }}
          >
            {/* Header style WhatsApp */}
            <Box
              sx={{
                px: 2,
                py: 1.2,
                bgcolor: "#075E54",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  src="http://127.0.0.1:8000/media/images/chatbot-icon.avif"
                  alt="Patoche"
                  sx={{ width: 44, height: 44 }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Patoche</Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <span style={{ fontSize: 9 }}>🟢</span> en ligne
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Tooltip title="Rechercher">
                  <IconButton size="small" sx={{ color: "white" }}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Options">
                  <IconButton size="small" sx={{ color: "white" }}>
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Petit sous-titre en haut du chat */}
            <Box
              sx={{
                px: 2.5,
                py: 1,
                bgcolor: "#128C7E",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {/* <Typography
                variant="body2"
                sx={{ fontStyle: "italic", textAlign: "center" }}
              >
                « À mon époque on réparait avec du scotch, du Ricard et des gros
                mots… Et voilà l’travail ! »
              </Typography> */}
            </Box>

            {/* Zone de messages */}
            <Box
              ref={chatRef}
              sx={{
                flex: 1,
                position: "relative",
                overflowY: "auto",
                px: { xs: 1.5, md: 3 },
                py: 2,
                // pattern clair de fond (style WhatsApp)
                backgroundImage:
                  "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              <Stack spacing={0.8}>
                {messages.map((m, i) => {
                  const isUser = m.from === "user";
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "75%",
                          display: "inline-flex",
                          flexDirection: "column",
                          alignItems: isUser ? "flex-end" : "flex-start",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            mb: 0.2,
                            color: isUser ? "#128C7E" : "#555",
                            fontWeight: 600,
                          }}
                        >
                          {isUser ? "Toi" : "Patoche"}
                        </Typography>

                        <Paper
                          elevation={1}
                          sx={{
                            px: 1.6,
                            py: 1,
                            borderRadius: 3,
                            bgcolor: isUser ? "#DCF8C6" : "#FFFFFF",
                            color: "#111",
                            border: "1px solid rgba(0,0,0,0.08)",
                            position: "relative",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: "pre-wrap" }}
                          >
                            {m.text}
                          </Typography>
                        </Paper>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            {/* Input bar en bas */}
            <Box
              sx={{
                px: 2,
                py: 1.2,
                bgcolor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Écris à Patoche..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 999,
                    bgcolor: "white",
                  },
                }}
              />

              <IconButton
                onClick={sendMessage}
                disabled={loading}
                sx={{
                  bgcolor: "#128C7E",
                  color: "white",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  "&:hover": {
                    bgcolor: "#0c6f60",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  <SendRoundedIcon />
                )}
              </IconButton>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
