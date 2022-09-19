import React from 'react';

const useFetchWithLoader = () => {
    const [ loading, setLoading ] = React.useState(false);

    let controller;

    const callEndpoint = async axiosCall => {
        if ('controller' in axiosCall) controller = axiosCall.controller;

        setLoading(true);

        let result;

        try {
            result = await axiosCall.call;
        } catch (err) {
            setLoading(false);

            result = err.response?.data || err.response;
        }

        setLoading(false);

        return result;
    };

    const cancelEndpointCall = () => {
        setLoading(false);

        controller && controller.abort();
    };

    React.useEffect(() => {
        return () => cancelEndpointCall();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, callEndpoint };
};

export default useFetchWithLoader;