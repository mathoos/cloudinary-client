
import PageLayout from "../components/PageLayout";
import HomepageBackground from "../img/homepage.gif";


function Homepage() {

    return (
        <PageLayout
            title="Build <br/> intelligent <br/> creation."
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."
            buttonText="Drop it"
            buttonLink="/home"
            backgroundImage={HomepageBackground}
        />
    )
}


export default Homepage;