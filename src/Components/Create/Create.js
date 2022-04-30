import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext,AuthContext } from "../../store/Context";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const date = Date()
  const history = useHistory();
  const handleSubmit = () => {
    firebase.storage().ref(`/images/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name: name,
          category: category,
          price: price,
          image: url,
          user: user.uid,
          createdAt: date.toString().substring(0, 15)
        })
        history.push("/")
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
             type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="fname"
               name="Price" />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : '' }></img>

            <br />
            <input type="file" onChange={(e)=>{
            setImage(e.target.files[0])
          }} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
