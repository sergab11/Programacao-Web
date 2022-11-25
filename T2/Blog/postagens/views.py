from django.shortcuts import render, redirect, get_object_or_404, HttpResponse

from postagens.models import Postagem
from postagens.forms import CriaFormularioDaPostagem, AtualizaFormPostagem
from conta.models import Conta

def cria_post_view(request):

    context = {}

    user = request.user
    if not user.is_authenticated:
        return redirect("tela-precisa-autenticar")
    
    form = CriaFormularioDaPostagem(request.POST or None, request.FILES or None)
    if form.is_valid():
        obj = form.save(commit=False)
        autor = Conta.objects.filter(email=user.email).first()
        obj.autor = autor
        obj.save()
        form = CriaFormularioDaPostagem()

    context['form'] = form

    return render(request, "postagens/cria-post.html", context)

def detalhes_post_view(request, slug):
    context = {}

    postagem_blog = get_object_or_404(Postagem, slug=slug)
    context['postagem_blog'] = postagem_blog

    return render(request, 'postagens/detalhes-post.html', context)

def edita_post_view(request, slug):
    
    context = {}

    user = request.user
    if not user.is_authenticated:
        return redirect("tela-precisa-autenticar")

    postagem_blog = get_object_or_404(Postagem, slug=slug)
    if postagem_blog.autor != user:
        return HttpResponse('Você não é o autor desta postagem.')
    
    if request.POST:
        form = AtualizaFormPostagem(request.POST or None, request.FILES or None, instance=postagem_blog)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.save()
            context['success_message'] = "Atualizado!"
            postagem_blog = obj

    form = AtualizaFormPostagem(
        initial = {
            "titulo": postagem_blog.titulo,
            "corpo": postagem_blog.corpo,
            "imagem": postagem_blog.imagem,
        }
    )

    context['form'] = form
    return render(request, 'postagens/edita-post.html', context)
