import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
// import validate from "../Validations/Validations";
import style from "./AddForm.module.css";

const validate = (form) => {
  let errors = {}
  if(!form.name) {
      errors.name = "Name is required, it should not contain numbers"
  }
  if(!form.heightMin || !form.heightMax) {
      errors.height = "Height is required"
  }
  if(!form.weightMin || !form.weightMax) {
      errors.weight = "Weight is required"
  }
  if(!form.life_span) {
      errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
  }
  return errors
}


export default function FormAddDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
  });

  const [form, setForm] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.heightMin.length > 0 &&
      form.heightMax.length > 0 &&
      form.weightMin.length > 0 &&
      form.weightMax.length > 0
    )
      setButton(false);
    else setButton(true);
  }, [form, setButton]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(form));
    alert("The new dog was added successfully");
    setForm({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, e.target.value],
    });
  };

  const handleDelete = (el) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== el),
    });
  };

  return (
    <div className={style.main_wrapper}>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.button_to_home}>Go home</button>
        </Link>
        <form
          action=""
          id="form"
          onSubmit={handleSubmit}
          className={`${style.form}`}
        >
          <div className={style.name_container}>
            <input
              className={style.input_name}
              type="text"
              value={form.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name..."
            />
          </div>
          <div className={style.error_form}>
            {errors.name && <p>{errors.name}</p>}
          </div>{" "}
          {/*mesaje ed error de nombre*/}
          <div className={style.height_container}>
            <div className={style.min_height}>
              <input
                type="number"
                value={form.heightMin}
                name="heightMin"
                placeholder="Min height..."
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={style.max_height}>
              <input
                type="number"
                value={form.heightMax}
                name="heightMax"
                placeholder="Max height..."
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.height && <p>{errors.height}</p>}
          </div>
          {/* espacio para agregar error */}
          {/* espacio para agregar error */}
          <div className={style.weight_container}>
            <div className={style.min_weight}>
              <input
                type="number"
                value={form.weightMin}
                name="weightMin"
                placeholder="Min weight..."
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={style.max_weight}>
              <input
                type="number"
                value={form.weightMax}
                name="weightMax"
                placeholder="Max weight..."
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.weight && <p>{errors.weight}</p>}
          </div>
          {/* espacio para agregar error */}
          <div className="life-span-container">
            <input
              type="text"
              autoComplete="off"
              name="life_span"
              value={form.life_span}
              placeholder="lifespan exam: 10 - 12"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.error_form}>
            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          {/* espacio para agregar error */}
          <div className="image-container">
            <input
              type="text"
              autoComplete="off"
              value={form.image}
              name="image"
              placeholder="Image URL..."
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={""}>
            <h3>Select Temperaments</h3>
          </div>
          <div className={""}>
            <select
              className={style.select_temperaments}
              onChange={handleSelect}
            >
              <option disabled selected>
                Temperaments
              </option>
              {temperaments.map((d) => (
                <option
                  value={d.name}
                  key={d.name + Math.random()}
                  className={style.option_temperament}
                >
                  {d.name}
                </option> //key de elementos de temperamentos, eliminar el repetido reserved
              ))}
            </select>
          </div>
          <div className={style.container_button_add_dog}>
            <button
              className={style.button_add_dog}
              disabled={button}
              type="submit"
              form="form"
            >
              Create Dog
            </button>
          </div>
        </form>

        <div className="">
          <div className="">
            <h2>Temperaments</h2>
          </div>

          <div className={style.container_temperaments}>
            {form.temperaments.map((el) => (
              <div
                className={style.element_temperament}
                key={el}
                onClick={() => handleDelete(el)}
              >
                <p>{`${el}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}