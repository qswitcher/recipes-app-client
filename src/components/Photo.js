import React from "react";
import { S3Image } from "aws-amplify-react";

class Photo extends React.Component {
    render() {
        const { photo } = this.props;

        return (
            <S3Image
                imgKey={(photo && photo.key.split("/")[1]) || "placeholder.jpg"}
                theme={{
                    photoImg: {
                        width: "100%",
                        display: "block"
                    }
                }}
            />
        );
    }
}

export default Photo;
