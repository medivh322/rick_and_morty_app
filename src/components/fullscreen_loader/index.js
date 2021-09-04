import { Spinner } from "react-bootstrap";

const FullscreenLoader = () => {
    return (
        <div className="fullscreen_loader">
            <Spinner animation="grow" />
        </div>
    )
}

export default FullscreenLoader;