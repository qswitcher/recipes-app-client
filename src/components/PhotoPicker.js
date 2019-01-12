import React from "react";
import aws_config from "../aws-exports";
import uuid from "uuid";
import { Storage } from "aws-amplify";
import styled from "styled-components";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImgInput = styled.input`
    width: 100%;
    height: 100%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
`;

const CameraIcon = styled.div`
    position: absolute;
    left: 8px;
    bottom: 8px;
    transition: all 0.1s linear;
    padding: 6px;
    border-radius: 3px;

    svg {
        filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1));
        color: #ffffff;
        font-size: 1.8em;
    }
`;

const PhotoPickerDiv = styled.div`
    position: relative;

    :hover {
        div${CameraIcon} {
            background: rgba(0, 0, 0, 0.8);
        }
    }
`;

class PhotoPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { previewSrc: undefined };
    }

    componentDidMount() {
        if (this.props.imgKey) {
            this.load(this.props.imgKey);
        }
    }

    load = imgKey => {
        Storage.get(imgKey.split("/")[1]).then(url => {
            this.setState({ previewSrc: url });
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.imgKey !== this.props.imgKey) {
            this.load(this.props.imgKey);
            // this.setState({ });
        }
    }

    handleOnChange = e => {
        const file = e.target.files[0];
        const previewSrc = e.target.result;

        // selectedFile is the file to be uploaded, typically comes from an <input type="file" />
        const { name, type: mimeType } = file;
        const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name);

        const bucket = aws_config.aws_user_files_s3_bucket;
        const region = aws_config.aws_user_files_s3_bucket_region;
        const key = [uuid(), extension].filter(x => !!x).join(".");

        this.props.onChange({
            bucket,
            key: `public/${key}`,
            region,
            mimeType,
            localUri: file
        });

        const reader = new FileReader();
        const that = this;
        reader.onload = function(e) {
            const url = e.target.result;
            that.setState({ previewSrc: url });
        };
        reader.readAsDataURL(file);
    };

    render() {
        const { previewSrc } = this.state;
        return (
            <PhotoPickerDiv>
                {previewSrc && (
                    <React.Fragment>
                        <img
                            width="100%"
                            src={this.state.previewSrc}
                            alt="Preview"
                        />
                        <CameraIcon>
                            <FontAwesomeIcon icon={faCamera} />
                        </CameraIcon>
                    </React.Fragment>
                )}
                <ImgInput
                    type="file"
                    accept="image/*"
                    onChange={e => this.handleOnChange(e)}
                />
            </PhotoPickerDiv>
        );
    }
}

export default PhotoPicker;
