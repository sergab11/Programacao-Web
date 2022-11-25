from django.urls import path
from postagens.views import (
    cria_post_view,
    detalhes_post_view,
    edita_post_view,
)

app_name= 'postagens'

urlpatterns = [
    path('cria/', cria_post_view, name="cria"),
    path('<slug>/', detalhes_post_view, name="detalhe"),
    path('<slug>/edit/', edita_post_view, name="edita"),
]