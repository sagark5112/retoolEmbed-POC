import Retool from 'react-retool';
import { useLocation } from 'react-router-dom';

const RetoolHome = ({loadingUrl}) => {
    const { state } = useLocation();

    console.info("state", state.retoolEmbedUrl);
    return(
        <div style={{height: '100vh'}}>
        <Retool url={state.retoolEmbedUrl} />
        </div>
        // <p>test</p>
    )
}

export default RetoolHome;