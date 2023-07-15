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
        errors.lifeSpan = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    return errors
  };

  export default validate