import Carousel from '../components/Carousel'

function Home() {
  return (
    <div
      className="
        flex w-full flex-1 items-center justify-center
        bg-linear-to-br
        from-purple-100
        via-white
        to-blue-100
        px-6 py-10
      "
    >
      <Carousel />
    </div>
  )
}

export default Home