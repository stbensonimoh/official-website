import React from "react"
import Button from "../components/Button"
import Header from "../components/Header"

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col items-center justify-center font-roboto pt-60 md:pt-20 mx-10">
          <img
            src="/images/404.png"
            width="40%"
            alt="404 Image"
            style={{ marginBottom: "1rem" }}
          />
          <h1 className="font-roboto font-bold text-bensonpink text-6xl">
            404
          </h1>
          <p className="my-6 text-center">
            Awww... Are you lost? It seems like the page you are looking for
            does not exist.
          </p>
          <Button type="internal" to="/">
            Let's go home
          </Button>
        </div>
      </main>
    </>
  )
}

export default NotFoundPage
