import React from "react";

const App = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    ; (async () => {
      const response = await fetch(`http://localhost:3000/api/v1/products/`);
      const result = await response.json();
      setProducts(result);
    })()
  }, [])
  return (
    <section>
      <div className="py-10">
        <div className="container">
          <h2 className="text-xl font-bold leading-normal text-center">
            Avoiding Race Conditions
          </h2>
          <p className="text-lg font-bold leading-normal text-center">
            {products.length}
          </p>
        </div>
      </div>
    </section>
  )
}

export default App;