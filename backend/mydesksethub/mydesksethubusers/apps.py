from django.apps import AppConfig


class MydesksethubusersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mydesksethubusers'

    def ready(self):
        import mydesksethubusers.signals