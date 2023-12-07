<template>
    <div ref="dropArea" class="file_input_wrapper" @dragleave="dragleave()" @dragover="dragover" @drop="drop" @click="openFileExplorer()">
        <div class="text-center">
            <strong>
                {{ text }}
            </strong>
            <br>
            <small class="error_text" v-if="error">
                {{ error }}
            </small>
            <small class="sub_text_color" v-if="isFileValid">
                הקובץ שהעלת: {{ file.name }}
            </small>
        </div>
        <input type="file" hidden ref="fileInput" accept="video/mp4,video/x-m4v,video/*" @change="filePicked()">
    </div>
</template>

<script>

export default {
    components: {
    },

    props: {
        text: {
            type: String,
            default: 'זרוק או לחץ בשביל לעלות את האתגר'
        }
    },

    data() {
        return {
            file: null,
            validFileTypes: ['video/mp4', 'video/quicktime','video/x-msvideo','video/x-ms-wmv','video/avi'],
            error: '',
        }
    },

    computed: {
        dropArea() {
            return this.$refs.dropArea;
        },

        fileInput() {
            return this.$refs.fileInput;
        },

        isFileValid() {
            return this.file && !this.error;
        }
    },

    methods: {
        drop(event) {
            event.preventDefault();
            if(!event.dataTransfer.files[0]) {
                this.dropArea.classList.remove('dragover');
                return;
            }
            
            this.file = event.dataTransfer.files[0];
            this.dropArea.classList.remove('dragover');
            this.validateFile();
        },

        validateFile() {
            this.error = '';

            if(!this.isFileSizeValid()) {
                this.error = 'הקובץ צריך להיות קטן יותר מ 20 מ"ב';
            }

            if(!this.isFileTypeValid()) {
                this.error = 'סוגי הקבצים הנתמכים: video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/avi'
            }

            if(this.error) {
                console.log('error');
                this.file = null;   
            }
            
            this.$emit('onChange', this.file);
        },

        isFileSizeValid() {
            return (this.file.size / 1024 / 1024) < 20; 
        },

        isFileTypeValid() {
            return this.validFileTypes.includes(this.file.type)
        },
        
        dragover(event) {
            event.preventDefault();
            this.dropArea.classList.add('dragover');
        },
        
        dragleave() {
            this.dropArea.classList.remove('dragover');
        },

        openFileExplorer() {
            this.$refs.fileInput.click();
        },

        filePicked() {
            if(!this.$refs.fileInput.files[0]) {
                return;
            }

            this.file = this.$refs.fileInput.files[0];
            this.validateFile();
        }
    }
}
</script>

<style scoped lang="scss">

    .file_input_wrapper {
        width: 100%;
        height: 100%;
        border: 1px dashed;
        border-radius: 8px;
        box-shadow: 0 2px 5px 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s all linear;
        cursor: pointer;
        position: relative;

        strong {
            font-size: 1.5em;
        }

        small {
            position: absolute;
            bottom: 3px;
            left: 5px;
            right: 5px;
            margin: auto;
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
        }
        
        .error_text {
            color: red;
        }

        &:hover {
            transform: scale(1.02);
        }
    }

    .dragover {
        cursor: grabbing;
        background-color: #eee;
        box-shadow: 0 5px 15px 2px
    }

</style>
