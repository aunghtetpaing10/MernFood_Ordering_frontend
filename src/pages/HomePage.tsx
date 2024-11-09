import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import SearchBar from "@/components/SearchBar"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col text-center gap-5 -mt-16">
        <h1 className="font-bold text-4xl md:text-5xl text-orange-500 tracking-tight">
          Tuck into a takeaway today
        </h1>
        <span className="text-lg md:text-xl">
          Food is just a click away!
        </span>
        <SearchBar />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalized recommendations.
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  )
}

export default HomePage