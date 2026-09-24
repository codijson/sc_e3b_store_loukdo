<script setup lang="ts">
import { ContactFormValidator } from "~/core/forms/ContactFormValidator";

interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), { loading: false });

const { t } = useOwnI18n();

const form = reactive({ name: "", email: "", message: "" });
const errors = reactive<{ name?: string; email?: string; message?: string }>({});
const status = ref<"idle" | "submitting" | "success">("idle");

const validator = new ContactFormValidator();

function handleSubmit() {
  const result = validator.validate(form);

  errors.name = result.errors.name;
  errors.email = result.errors.email;
  errors.message = result.errors.message;

  if (!result.valid) return;

  status.value = "submitting";
  // Placeholder submit — wire to your backend / form endpoint here.

  setTimeout(() => {
    status.value = "success";
    form.name = "";
    form.email = "";
    form.message = "";
  }, 500);
}
</script>

<template>
  <BaseCard>
    <template v-if="loading">
      <Skeleton width="50%" height="1.25rem" rounded="md" />
      <div class="mt-6 space-y-5" aria-hidden="true">
        <div v-for="field in 3" :key="field" class="space-y-1.5">
          <Skeleton width="30%" height="0.7rem" />
          <Skeleton height="2.5rem" rounded="lg" />
        </div>
        <Skeleton height="2.5rem" rounded="lg" />
      </div>
    </template>

    <template v-else>
      <h3 class="text-xl font-bold text-ink-900 dark:text-white">
        {{ t("contact.formTitle") }}
      </h3>

      <form class="mt-5 space-y-4" novalidate @submit.prevent="handleSubmit">
        <div>
          <label
            for="contact-name"
            class="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-100"
          >
            {{ t("contact.formName") }}
          </label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            :placeholder="t('contact.formNamePlaceholder')"
            class="w-full rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <p v-if="errors.name" class="mt-1.5 text-xs text-rose-500">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <label
            for="contact-email"
            class="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-100"
          >
            {{ t("contact.formEmail") }}
          </label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            :placeholder="t('contact.formEmailPlaceholder')"
            class="w-full rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <p v-if="errors.email" class="mt-1.5 text-xs text-rose-500">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label
            for="contact-message"
            class="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-100"
          >
            {{ t("contact.formMessage") }}
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            rows="4"
            :placeholder="t('contact.formMessagePlaceholder')"
            class="w-full resize-none rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-primary focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <p v-if="errors.message" class="mt-1.5 text-xs text-rose-500">
            {{ errors.message }}
          </p>
        </div>

        <BaseButton
          type="submit"
          class="w-full"
          :class="status === 'submitting' ? 'opacity-70' : ''"
        >
          {{ t("contact.formSubmit") }}
        </BaseButton>

        <transition name="fade-slide">
          <p
            v-if="status === 'success'"
            class="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            {{ t("contact.formSuccess") }}
          </p>
        </transition>
      </form>
    </template>
  </BaseCard>
</template>
