"use client";

const { useState, useRef } = require("react");

function AuthProvider({ children }) {
  const AUTH_TOKEN_KEY = "auth-token-data";
  const [tabId] = useState(() => Math.random().toString(36).slice(2));
  const [broadcastChannel] = useState(
    () => new BroadcastChannel(AUTH_TOKEN_KEY)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [use, setUser] = useState(null);
  const tokensInfoRef = useRef({
    token: null,
    refreshToken: null,
    tokenExpires: null,
  });
}
