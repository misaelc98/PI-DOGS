import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";
import style from "./AddForm.module.css";


const validate = (form) => {
  let errors = {};

  if (!form.name) {
    errors.name = "Name is required!";
  } else if (/\d/.test(form.name)) {
    errors.name = "Name cannot contain numbers!";
  }
  if (!form.heightMin || !form.heightMax) {
    errors.height = "Height is required!";
  } else if (form.heightMin > form.heightMax) {
    errors.height = "Min height can't be higher than Max height";
  } else if (form.heightMin < 0 || form.heightMax < 0) {
    errors.height = "Height must be higher than 0";
  } else if (!/^\d+$/.test(form.heightMin) || !/^\d+$/.test(form.heightMax)) {
    errors.height = "Height must be a number!";
  }
  if (!form.weightMin || !form.weightMax) {
    errors.weight = "Weight is required!";
  } else if (form.weightMin > form.weightMax) {
    errors.weight = "Min Weight can't be higher than Max weight";
  } else if (form.weightMin < 0 || form.weightMax < 0) {
    errors.height = "Weight must be higher than 0";
  } else if (!/^\d+$/.test(form.weightMin) || !/^\d+$/.test(form.weightMax)) {
    errors.height = "Height must be a number!";
  }
  if (!form.life_span) {
    errors.life_span =
      "Lifespan is required, type only numbers separated by a dash (-)";
  }
  if (!form.temperaments.length <= 0) {
    errors.temperaments = "Must select at least one temperament";
  }

  return errors;
};

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
      form.weightMax.length > 0 &&
      form.life_span.length > 0 &&
      form.temperaments.length > 0
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
    const selectedTemperament = e.target.value;
    if (!form.temperaments.includes(selectedTemperament)) {
      setForm({
        ...form,
        temperaments: [...form.temperaments, selectedTemperament],
      });
    }
  };

  const handleDelete = (el) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== el),
    });
  };

  return (
    <div className={style.main_wrapper}>
      <NavLink to="/home">
        <button type="button" className={style.botoncin}>
          HOME
        </button>
      </NavLink>
      <form action="" id="form" onSubmit={handleSubmit} className={style.form}>
        <div className={style.leftForm}>
          <div className={style.name_container}>
            <input
              autoComplete="off"
              className={style.input_name}
              type="text"
              value={form.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name"
            />
          </div>
          <div className={style.error_form}>
            {errors.name && <p>{errors.name}</p>}
          </div>{" "}
          <div className={style.height_container}>
            <div className={style.min_height}>
              <input
                autoComplete="off"
                type="number"
                value={form.heightMin}
                name="heightMin"
                placeholder="Min height"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={style.max_height}>
              <input
                autoComplete="off"
                type="number"
                value={form.heightMax}
                name="heightMax"
                placeholder="Max height"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.height && <p>{errors.height}</p>}
          </div>
          <div className={style.weight_container}>
            <div className={style.min_weight}>
              <input
                autoComplete="off"
                type="number"
                value={form.weightMin}
                name="weightMin"
                placeholder="Min weight"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={style.max_weight}>
              <input
                autoComplete="off"
                type="number"
                value={form.weightMax}
                name="weightMax"
                placeholder="Max weight"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className={style.error_form}>
            {errors.weight && <p>{errors.weight}</p>}
          </div>
          <div className="life-span-container">
            <input
              type="text"
              autoComplete="off"
              name="life_span"
              value={form.life_span}
              placeholder="Life Span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.error_form}>
            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          <div className="image-container">
            <input
              type="text"
              autoComplete="off"
              value={form.image}
              name="image"
              placeholder="Image URL"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className={style.rightForm}>
          <div className={""}>
            <h3>Select Temperaments</h3>
          </div>
          <div className={""}>
            <select
              className={style.select_temperaments}
              onChange={handleSelect}
            >
              <option value="" >
                Temperaments
              </option>
              {temperaments.map((d) => (
                <option
                  value={d.name}
                  key={d.name + Math.random()}
                  className={style.option_temperament}
                >
                  {d.name}
                </option>
              ))}
            </select>
          </div>
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
            <div className={style.requirements}>
              All fields are required
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
