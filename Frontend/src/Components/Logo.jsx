const Logo = ({textSize , color}) => {
  return (
    <> 

        <div className={`logo font-bold text-${textSize}`}>
          <span className="text-green-500 ">&lt;</span>
          <span className={`text-${color}`}>Pass</span>
          <span className="text-green-500 ">Vault/&gt;</span>
        </div>

        
      
    </>
  )
}

export default Logo
