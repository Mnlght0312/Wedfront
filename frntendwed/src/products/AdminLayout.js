import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductMain = () => {
  const productInit = {
    productName: "",
    price: 0,
    InStock: 0,
    categoryId: 0,
    thumbImage: "",
    images: [],
  };
  const [loading, setLoading] = useState(false);

  const [productItem, setProductItem] = useState(productInit);
  const navigate = useNavigate();

  const onSave = (e) => {
    // console.log("hahahah");
    // e.preventDfefault();
    axios.post("http://localhost:8080/api/product", productItem).then((res) => {
      console.log(res);
      if (res.data.status) {
        navigate("/about");
      } else {
        alert(res.data.message);
      }
    });
  };
  const sendFile = (files) => {
    console.log(files);
    setLoading(true);
    const formData = new FormData();
    const url = "https://api.cloudinary.com/v1_1/djtvcia4j/upload";

    formData.append("file", files[0]);
    formData.append("api_key", "633168448776231");
    formData.append("upload_preset", "zilnpuv0");

    axios.post(url, formData).then((res) => {
      setProductItem({ ...productItem, thumbImage: res.data.secure_url });
      setLoading(false);
      // console.log(res.data.secure_url);
    });
  };
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={onSave}
              >
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={productItem.productName}
                      onChange={(e) =>
                        setProductItem({
                          ...productItem,
                          productName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={productItem.price}
                      onChange={(e) =>
                        setProductItem({
                          ...productItem,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={productItem.InStock}
                      onChange={(e) =>
                        setProductItem({
                          ...productItem,
                          InStock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                    />
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) => {
                        sendFile(e.target.files);
                      }}
                    />
                    {loading && "Uploading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
