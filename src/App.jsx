import axios from "axios";
import React from "react";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [requestError, setRequestError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  // Using Fetch
  // React.useEffect(() => {
  //   let blocked = false;
  //   (async () => {
  //     try {
  //       setRequestError(false);
  //       setLoading(true);
  //       const response = await fetch(`http://localhost:3000/api/v1/products?search=${search}`);
  //       const result = await response.json();
  //       if (!blocked) {
  //         setProducts(result);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       setRequestError(true);
  //     }
  //   })()
  //   return () => {
  //     blocked = true;
  //   }
  // }, [search])

  // Using Axios
  React.useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setRequestError(false);
        setLoading(true);
        const response = await axios.get(`/api/v1/products?search=${search}`, {
          signal: controller.signal
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request is", error.message);
          return
        }
        setLoading(false);
        setRequestError(true);
      }
    })()
    return () => {
      controller.abort();
    }
  }, [search])

  return (
    <section>
      <div className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold leading-normal text-center">
            Avoiding Race Conditions
          </h2>
          <div>
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none border-2 border-slate-900 w-1/3 mt-5 m-auto block"
            />
          </div>
          {!requestError && !loading && <div className="grid grid-cols-4 gap-5 mt-5">
            {products.map((e, i) => (
              <div key={i} className="shadow-lg">
                <img src={e.thumbnail} alt="thumbnail" width={1000} height={300} className="h-[300px]" />
                <h3 className="text-lg text-black font-bold leading-normal p-3 pb-0">
                  {e.title}
                </h3>
                <p className="text-sm text-black leading-normal p-3">
                  {e.description}
                </p>
              </div>
            ))}
          </div>} 
          {!loading && requestError && <p
            className="text-lg font-bold text-white leading-normal text-center py-5 bg-red-500 mt-5">
            Something went wrong
          </p>}
          {loading && <p className="text-lg font-bold leading-normal text-center py-5 bg-green-300 mt-5">
            Loading...
          </p>}
          {!loading && !requestError && products.length <= 0 && <p
            className="text-lg font-bold text-white leading-normal text-center py-5 bg-amber-500 mt-5">
            No Products Found
          </p>}
        </div>
      </div>
    </section>
  )
}

export default App;