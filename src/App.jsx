import React from "react";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [errors, setErrors] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setErrors(false);
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/v1/products`);
        const result = await response.json();
        setProducts(result);
        setLoading(false);
      } catch (error) {
        setErrors(true);
        setLoading(false);
      }
    })()
  }, [])

  return (
    <section>
      <div className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold leading-normal text-center">
            Avoiding Race Conditions
          </h2>
          <p className="text-lg font-bold leading-normal text-center py-5 bg-green-300 mt-5">
            {!errors && !loading && products.length}
            {errors && ("Something went wrong")}
            {loading && ("Loading...")}
          </p>
        </div>
      </div>
    </section>
  )
}

export default App;