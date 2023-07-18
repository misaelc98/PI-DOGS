import style from "./Loading.module.css";

export default function Loading() {

  return (
    <div className={style.mainContainer}>
        <div className={style.runningDog}>
            <img alt="Doggy" src="https://i.gifer.com/Xqg8.gif"></img>
        <h3 className={style.loading}>Loading...</h3>
        </div>
    </div>
  )
}
