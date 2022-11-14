from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic.base import View
from django.http.response import HttpResponseRedirect
from django.urls.base import reverse_lazy

from django.contrib.auth.decorators import login_required, user_passes_test #(proteção nos métodos e funções)
from django.contrib.auth.mixins import LoginRequiredMixin #(proteção nas classes)
from django.contrib.auth.forms import UserCreationForm

from django.views.generic.edit import UpdateView    #proteção contra modificacao de dados de usuario

from trabalho2.models import Pessoa
from trabalho2.forms import ContatoModel2Form

def testaAcesso(user):
    # coloque aqui os testes que você precisar
    if user.has_perm('contatos.change_pessoa'):
        return True
    else:
        return False

# Aplicação de páginas básicas ####################################################################
@login_required
@user_passes_test(testaAcesso)
def home(request):
    print(request.user.get_all_permissions())
    return render(request, 'trabalho2/index.html')

@login_required
@user_passes_test(testaAcesso)
def segundaPagina(request):
    print(request.user.get_all_permissions())
    return render(request, 'trabalho2/segunda.html')

# Aplicação Contatos ##############################################################################
class ContatoListView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        pessoas = Pessoa.objects.all()
        contexto = { 'pessoas': pessoas, }
        return render(request, 'trabalho2/listaContatos.html', contexto)

class ContatoCreateView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        contexto = { 'formulario': ContatoModel2Form, }
        return render(request, "trabalho2/criaContato.html", contexto)

    def post(self, request, *args, **kwargs):
        formulario = ContatoModel2Form(request.POST)
        if formulario.is_valid():
            contato = formulario.save()
            contato.save()
            return HttpResponseRedirect(reverse_lazy("lista-contatos"))

class ContatoUpdateView(LoginRequiredMixin, View):
    def get(self, request, pk, *args, **kwargs):
        pessoa = Pessoa.objects.get(pk=pk)
        formulario = ContatoModel2Form(instance=pessoa)
        context = {'pessoa': formulario, }
        return render(request, 'trabalho2/atualizaContato.html', context)

    def post(self, request, pk, *args, **kwargs):
        pessoa = get_object_or_404(Pessoa, pk=pk)
        formulario = ContatoModel2Form(request.POST, instance=pessoa)
        if formulario.is_valid():
            pessoa = formulario.save() # cria uma pessoa com os dados do formulário
            pessoa.save() # salva uma pessoa no banco de dados
            return HttpResponseRedirect(reverse_lazy("lista-contatos"))
        else:
            contexto = {'pessoa': formulario, }
            return render(request, 'trabalho2/atualizaContato.html', contexto)

class ContatoDeleteView(LoginRequiredMixin, View):
    def get(self, request, pk, *args, **kwargs):
        pessoa = Pessoa.objects.get(pk=pk)
        contexto = { 'pessoa': pessoa, }
        return render(request, 'trabalho2/apagaContato.html', contexto)

    def post(self, request, pk, *args, **kwargs):
        pessoa = Pessoa.objects.get(pk=pk)
        pessoa.delete()
        return HttpResponseRedirect(reverse_lazy("lista-contatos"))

# Controle de acesso ##############################################################################
def homeSec(request):
    return render(request, "trabalho2/registro/homeSec.html")

@login_required
@user_passes_test(testaAcesso)
def registro(request):  # Registro de usuário
    print(request.user.get_all_permissions())
    if request.method == 'POST':
        formulario = UserCreationForm(request.POST)
        if formulario.is_valid():
            formulario.save()
            return redirect('sec-home')
    else:
        formulario = UserCreationForm()
    context = {'form': formulario, }
    return render(request, 'trabalho2/registro/registro.html', context)

@login_required
@user_passes_test(testaAcesso)
def paginaSecreta(request):
    print(request.user.get_all_permissions())
    return render(request, 'trabalho2/registro/paginaSecreta.html')

# Perfil do usuário ###########################################################################
class MeuUpdateView(UpdateView):
    def get(self, request, pk, *args, **kwargs):
        if request.user.id == pk:
            return super().get(request, pk, args, kwargs)
        else:
            return redirect('sec-home')