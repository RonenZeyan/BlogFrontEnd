
export default function Footer(){
    return(
        <footer style={styles}>
            CopyRight 2025 &copy;
        </footer>
    )
}

const styles={
    color: "var(--pumpkin-color)",
    fontSize:"21px",
    backgroundColor:"var(--white-color)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"50px",
    boxShadow: "4px 0 8px rgba(0, 0, 0, 1)",
    borderTop:"1px solid var(--pumpkin-color)",
}
