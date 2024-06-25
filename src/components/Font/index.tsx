import Head from "next/head"

export const Font: React.FC = () => {

  return (
    <Head>
      {/*refer to: https://csswizardry.com/2020/05/the-fastest-google-fonts/#google-fonts-async-snippet*/}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={"anonymous"}
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        as="style"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        />
      </noscript>
    </Head>
  )
}
