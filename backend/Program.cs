using Microsoft.EntityFrameworkCore;

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Trabalho
{
	class Usuario
    {
    	public int id { get; set; }
		public string? nome { get; set; }
    	public string? email { get; set; }
    }
	

	class Animal
    {
    	public int id { get; set; }
		public string? nome { get; set; }
    	public string? descricao { get; set; }
    }

	class Adocao
    {
    	public int id { get; set; }
		public int? userId { get; set; }
    	public int? animalId { get; set; }
    	// public string? nomeUser { get; set; }
    	// public string? nomeAnimal { get; set; }
		
    }
	class BaseAdocoes : DbContext
	{
		public BaseAdocoes(DbContextOptions options) : base(options) {}
		
		public DbSet<Usuario> Usuarios { get; set; } = null!;
		public DbSet<Animal> Animais { get; set; } = null!;
		public DbSet<Adocao> Adocoes { get; set; } = null!;
	}
	
	class Program
	{
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("AdocoesAnimais") ?? "Data Source=AdocoesAnimais.db";
			builder.Services.AddSqlite<BaseAdocoes>(connectionString);
			
			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			
			var app = builder.Build();

			builder
				.HasMany(e => e.OrderItems)
				.WithOne(e => e.Order)
				.HasForeignKey(e => e.OrderItemId)
				.OnDelete(DeleteBehavior.Cascade);
			
			//ativa a politica de cross-origin
			app.UseCors();

            //--------------------------------------- Usuarios --------------------------------------- //
            //--------------------------------------- Usuarios --------------------------------------- //
            //--------------------------------------- Usuarios --------------------------------------- //
			
			app.MapGet("/usuarios", (BaseAdocoes baseAdocoes) => {
				return baseAdocoes.Usuarios.ToList();
			});
			
			app.MapGet("/usuario/{id}", (BaseAdocoes baseAdocoes, int id) => {
				return baseAdocoes.Usuarios.Find(id);
			});
			
			app.MapPost("/cadastrarUsuario", (BaseAdocoes baseAdocoes, Usuario usuario) =>
			{
				baseAdocoes.Usuarios.Add(usuario);
				baseAdocoes.SaveChanges();
				return ("usuario adicionado", usuario);
			});
			
			app.MapPut("/atualizarUsuario/{id}", (BaseAdocoes baseAdocoes, Usuario usuarioAtualizado, int id) =>
			{
				var usuario = baseAdocoes.Usuarios.Find(id);
				usuario.nome = usuarioAtualizado.nome;
				usuario.email = usuarioAtualizado.email;
				baseAdocoes.SaveChanges();
				return "usuario atualizado";
			});
						
			app.MapDelete("/deletarUsuario/{id}", (BaseAdocoes baseAdocoes, int id) =>
			{
				var usuario = baseAdocoes.Usuarios.Find(id);
				baseAdocoes.Remove(usuario);
				baseAdocoes.SaveChanges();
				return "usuario deletado";
			});
            //--------------------------------------- Animais --------------------------------------- //
            //--------------------------------------- Animais --------------------------------------- //
            //--------------------------------------- Animais --------------------------------------- //

			app.MapGet("/animal", (BaseAdocoes baseAdocoes) => {
				return baseAdocoes.Animais.ToList();
			});
			
			app.MapGet("/animal/{id}", (BaseAdocoes baseAdocoes, int id) => {
				return baseAdocoes.Animais.Find(id);
			});
			
			app.MapPost("/cadastrarAnimal", (BaseAdocoes baseAdocoes, Animal animal) =>
			{
				baseAdocoes.Animais.Add(animal);
				baseAdocoes.SaveChanges();
				return "Animal adicionado";
			});
			
			app.MapPut("/atualizarAnimal/{id}", (BaseAdocoes baseAdocoes, Animal animal, int id) =>
			{
				var bicho = baseAdocoes.Animais.Find(id);
				bicho.nome = animal.nome;
				bicho.descricao = animal.descricao;
				baseAdocoes.SaveChanges();
				return "Animal atualizado";
			});
						
			app.MapDelete("/deletarAnimal/{id}", (BaseAdocoes baseAdocoes, int id) =>
			{
				var animal = baseAdocoes.Animais.Find(id);
				if(animal == null)
				{
					return Results.NotFound();
				}
				baseAdocoes.Remove(animal);
				baseAdocoes.SaveChanges();
				return "Animal deletado";
			});

            //--------------------------------------- Adoções --------------------------------------- //
            //--------------------------------------- Adoções --------------------------------------- //
            //--------------------------------------- Adoções --------------------------------------- //
			
            app.MapGet("/adocoes", (BaseAdocoes baseAdocoes) => {
				return baseAdocoes.Adocoes.ToList();
			});
			
			app.MapGet("/adocoes/{id}", (BaseAdocoes baseAdocoes, int id) => {
				return baseAdocoes.Adocoes.Find(id);
			});
			

			app.MapPost("/cadastrarAdocao", (BaseAdocoes baseAdocoes, Adocao adocao ) =>
			{
				adocao.userId = adocao.userId;
				adocao.animalId = adocao.animalId;
				// Usuario? user = baseAdocoes.Usuarios.Find(adocao.userId);
				// Animal? animal = baseAdocoes.Animais.Find(adocao.animalId);
				// adocao.nomeUser = user.nome;
				// adocao.nomeAnimal = animal.nome;
				baseAdocoes.Adocoes.Add(adocao);
				baseAdocoes.SaveChanges();
				return "Adocão cadastrada";
			});
			
			app.MapPut("/atualizarAdocao/{id}", (BaseAdocoes baseAdocoes, Adocao adocao, int id) =>
			{
				var adocao1 = baseAdocoes.Adocoes.Find(id);
				adocao1.userId = adocao.userId;
				adocao1.animalId = adocao.animalId;
				baseAdocoes.SaveChanges();
				return "Adoção atualizada";
			});
						
			app.MapDelete("/deletarAdocao/{id}", (BaseAdocoes baseAdocoes, int id) =>
			{
				var adocao = baseAdocoes.Adocoes.Find(id);
				baseAdocoes.Remove(adocao);
				baseAdocoes.SaveChanges();
				return "Adoção deletada";
			});

			app.Run("http://localhost:3000");
		}
	}
}