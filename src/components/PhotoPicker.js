import React from "react";
import aws_config from "../aws-exports";
import uuid from "uuid";
import { Storage } from "aws-amplify";
import styled from "styled-components";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PreviewImage = styled.img`
    width: 100%;
    display: block;
`;

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

    &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.4;
        background-size: contain;
        background-image: url(${({ previewSrc }) => previewSrc});
    }

    :hover {
        div${CameraIcon} {
            background: rgba(0, 0, 0, 0.8);
        }
    }
`;

class PhotoPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewSrc:
                "https://s3.amazonaws.com/recipes-uploads/public/placeholder.jpg"
        };
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

    // componentDidUpdate(prevProps) {
    //     if (prevProps.imgKey !== this.props.imgKey) {
    //         this.load(this.props.imgKey);
    //     }
    // }

    handleOnChange = e => {
        const file = e.target.files[0];

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

    loadCrop = () => {
        const img = document.getElementById("recipe-photo-preview");
        const height = img.clientHeight;
        const width = img.clientWidth;
        const ratio = 477 / 848;

        if (height / width > ratio) {
            const diff = (height - ratio * width) / 2;
            img.style["clip-path"] = `inset(${diff}px 0 ${diff}px 0)`;
        } else {
            const diff = (width - height / ratio) / 2;
            img.style["clip-path"] = `inset(0 ${diff}px 0 ${diff}px)`;
        }
    };

    render() {
        const { previewSrc } = this.state;
        return (
            <PhotoPickerDiv previewSrc={this.state.previewSrc}>
                {previewSrc && (
                    <React.Fragment>
                        <PreviewImage
                            id="recipe-photo-preview"
                            src={this.state.previewSrc}
                            alt="Preview"
                            onLoad={this.loadCrop}
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
