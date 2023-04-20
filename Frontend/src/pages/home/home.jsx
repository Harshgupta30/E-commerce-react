import Navbar from '../../components/Navbar/navbar';
import Cards from '../../components/cards/cards';
import Footer from '../../components/footer/footer';
import Crousal from '../../components/Crousal/crousal';


export default  function Home({logout,user}){
    return(
        <>
          <>
            <Navbar logout={logout} />
            <Crousal/>
            <Cards user={user} itemsPerPage={5}/>
            <Footer/>
            </>
        </>
    )
}
