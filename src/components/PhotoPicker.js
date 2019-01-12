import React from "react";
import aws_config from "../aws-exports";
import uuid from "uuid";

class PhotoPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { previewSrc: undefined };
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
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => this.handleOnChange(e)}
                />
                {previewSrc && (
                    <img
                        width="100%"
                        src={this.state.previewSrc}
                        alt="Preview"
                    />
                )}
            </div>
        );
    }
}

export default PhotoPicker;
