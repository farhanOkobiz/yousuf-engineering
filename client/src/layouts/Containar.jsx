
// max-w-8xl

// eslint-disable-next-line react/prop-types
const Containar = ({ children, className }) => {
  return (
    <div className={`max-w-[900px] xl:max-w-screen-[1100px] 2xl:max-w-screen-xl mx-auto ${className}`}>{children}</div>
  )
}

export default Containar