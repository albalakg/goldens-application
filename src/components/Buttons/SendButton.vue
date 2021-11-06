<template>
<MainButton
    shadow
>
    <template slot="content">
        <span>
            שליחה
        </span>
        <v-icon color="white" class="mr-1">mdi-email-fast-outline</v-icon>
    </template>
</MainButton>
</template>

<script>
import MainButton from './MainButton.vue';

export default {
    components: {
        MainButton,
    }
}
</script>