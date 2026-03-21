import "./assets/styles/ErrorPage.css";

export default function ErrorPage({message}){

    const closeError = () => {
        const page = document.getElementById('error-page');
        page.style.display = 'none';
    }
    return (
        <div className="main-screen" id="error-page">
            <div className="error-screen">
                <p className="error">
                    {message}
                </p>
                <button onClick={closeError}>Ok</button>
            </div>
        </div>
    );
}