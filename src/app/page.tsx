"use client";

import VideoList from "@/components/Video/VideoList";
import { GlobalStyle } from "@/styles/global-styles";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
// import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </Head> */}
      <GlobalStyle />
      <Toaster />
      <VideoList />
    </main>
  );
}
