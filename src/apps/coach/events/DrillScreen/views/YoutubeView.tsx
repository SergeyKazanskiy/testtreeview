import Constants from 'expo-constants';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


const YT_EMBED_BASE = "https://www.youtube.com/embed";

function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== "string") return null;

  const regExp = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export interface YouTubePlayerProps {
  source: string; // only ID
}

export default function YouTubePlayer({ source }: YouTubePlayerProps) {
  const h = 200;
  const w = "100%";

  const id = extractYouTubeVideoId(source);

  if (!id) {
  return (
    <View style={{ width: w, height: h, backgroundColor: "#000",
        justifyContent: "center", alignItems: "center"}}
    >
      <Text style={{ color: "#fff", fontSize: 16 }}>No link provided</Text>
    </View>
  );
}

  const isWeb = Platform.OS === "web";
  const isExpoGo = Constants.executionEnvironment === "storeClient";

  // For loader
  const [loading, setLoading] = useState(true);

  // 📌 HTML iframe (Expo Go)
  const html = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;">
        <iframe
          width="100%"
          height="100%"
          src="${YT_EMBED_BASE}/${id}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;

  // 📌 Loader overlay
  const loader = (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );

  // 🟦 WEB — обычный iframe
  if (isWeb) {
    return (
      <div style={{ width: w, height: h , position: "relative" }}>
        <iframe
          width="100%"
          height="100%"
          src={`${YT_EMBED_BASE}/${id}`}
          style={{ borderWidth: 0 }}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // 🟧 Expo Go — только HTML iframe
  if (isExpoGo) {
    return (
      <View style={{ width: w, height: h  }}>
        {loading && loader}

        <WebView
          style={{ backgroundColor: "black" }}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          originWhitelist={["*"]}
          source={{ html }}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
    );
  }

  // 🟩 Standalone — прямой embed URL
  return (
    <View style={{ width: w, height: h }}>
      {loading && loader}

      <WebView
        style={{ backgroundColor: "black" }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        source={{ uri: `${YT_EMBED_BASE}/${id}` }}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}
